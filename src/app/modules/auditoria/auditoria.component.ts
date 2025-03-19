import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditoria',
    imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, FormsModule , MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AuditoriaComponent implements AfterViewInit{
  displayedColumns: string[] = ['nombreusuario', 'cedulausuario', 'correousuario', 'telefonousuario','cargopermiso'];
  dataSource = new MatTableDataSource<usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
	p:any;
	limit = 50;
	offset = 0;


  constructor(private api: APIService)
  {	
    
  }
  
  
  
  ngAfterViewInit() {
    let p;
    let params= 
    {
      limit : this.limit,
      offset : this.offset,
    }


    this.api.select("usuario","list", params).subscribe(res =>
    {
      this.p = res;
      this.dataSource = new MatTableDataSource(this.p)
      this.dataSource.paginator = this.paginator;
    })
  }

        
  searchTerm: string = '';
    
  // Carga datos desde la API
  loadData() {
    let p = {searchTerm: this.searchTerm}
    this.api.select("usuario","search",p).subscribe(res=>{
        let a:any = res
        this.dataSource.data = a
        this.dataSource.paginator = this.paginator;

    })

  }

  // Aplica el filtro (llama a la API)
  applyFilter() {
    console.log(this.searchTerm)
    this.loadData(); // Recarga datos con el término de búsqueda
  }


}

export interface usuario {
  nombreusuario: string;
  cedulausuario: string;
  correousuario: string;
  telefonousuario: string;
  cargopermiso: string;
}

