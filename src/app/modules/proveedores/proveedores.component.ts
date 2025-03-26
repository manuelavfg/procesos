import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Proveedor
{
  icono:string,
  titulo:string,
  id: number
}

@Component({
  selector: 'app-proveedores',
  imports: [ MatTableModule, MatPaginatorModule, FormsModule ,MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})

export class ProveedoresComponent  {


  pagecount:any
  p:any;
  limit = 50;
  offset = 0;
  displayedColumns: string[] = ['nombreproveedores', 'rifproveedores', 'telefonoproveedores', 'direccionproveedores', 'correoproveedores'];
  dataSource! : MatTableDataSource<Proveedor>;
  public card: any[] = []
  id: any
  scrollAmount = 300; // Ajusta la cantidad de desplazamiento

	@ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private api : APIService, private router: Router)
  {
    let p = 
    {
      limit: 10,
      offset: 0,
    }
    this.api.select("proveedores","list",p).subscribe({next:res=>
      {
        this.p = res;
        this.dataSource = new MatTableDataSource(this.p)
        this.dataSource.paginator = this.paginator;
      }})
    
  }


  searchTerm: string = '';
    
  // Carga datos desde la API
  loadData() {
    let p = {searchTerm: this.searchTerm}
    this.api.select("proveedores","search",p).subscribe(res=>{
        let a:any = res
        this.dataSource.data = a
        this.dataSource.paginator = this.paginator;

    })

  }

  abrirReporte()
  { 
      let p:any;
      let params= 
      {
          limit : this.limit,
      }

       p = {label:"Proveedores", tabla:'proveedores', metodo:'list', params:params, busqueda:'nombreproveedores'}
      this.api.mostrarReporte(p)
  }


  // Aplica el filtro (llama a la API)
  applyFilter() {
    console.log(this.searchTerm)
    this.loadData(); // Recarga datos con el término de búsqueda
  }

}
