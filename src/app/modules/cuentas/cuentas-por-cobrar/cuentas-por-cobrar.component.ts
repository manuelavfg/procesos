import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-cuentas-por-cobrar',
    imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, FormsModule , MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrl: './cuentas-por-cobrar.component.scss'
})
export class CuentasPorCobrarComponent implements AfterViewInit {
  displayedColumns: string[] = ['codigocuentascobrar', 'nombreclientes' , 'numerofactura', 'total_pagado'];
    dataSource = new MatTableDataSource<any>();
  
    limit = 50;
    offset = 0;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private api: APIService)
    {	
      
    }    
  
    ngAfterViewInit() {
      let p:any
      let params= 
      {
        limit : this.limit,
        offset : this.offset,
      }
  
  
      this.api.select("cuentasporcobrar","list", params).subscribe(res =>
      {
        p = res;
        this.dataSource = new MatTableDataSource(p)
        this.dataSource.paginator = this.paginator;
      })
    }

    searchTerm: string = '';
    
      // Carga datos desde la API
      loadData() {
        let p = {searchTerm: this.searchTerm}
        this.api.select("cuentasporcobrar","search",p).subscribe(res=>{
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

export interface Cobrar {
  nombreclientes: any;
  codigocuentascobrar: any;
  total_pagado: any;
  numerofactura: any;
}

