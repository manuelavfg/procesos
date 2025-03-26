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

export interface Clientes {
  nombreclientes: string;
  rifclientes: string;
  telefonoclientes: string;
  direccionclientes:string;
  correoclientes: string;

}

@Component({
  selector: 'app-clientes',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, FormsModule , MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})

export class ClientesComponent implements AfterViewInit {
  pagecount:any
  p:any;
  limit = 50;
  offset = 0;
  displayedColumns: string[] = ['nombreclientes', 'rifclientes', 'telefonoclientes', 'direccionclientes', 'correoclientes'];
  dataSource! : MatTableDataSource<Clientes>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private api: APIService, public router: Router)
  {	
    
  }    

	ngAfterViewInit() {
		let p;
		let params= 
		{
			limit : this.limit,
			offset : this.offset,
		}


		this.api.select("clientes","list", params).subscribe(res =>
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
        this.api.select("clientes","search",p).subscribe(res=>{
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

      abrirReporte()
      { 
          let p:any;
          let params= 
          {
              limit : this.limit,
          }

           p = {label:"Clientes", tabla:'clientes', metodo:'list', params:params, busqueda:'nombreclientes'}
          this.api.mostrarReporte(p)
      }

}



