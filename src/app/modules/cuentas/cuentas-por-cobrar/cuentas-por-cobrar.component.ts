import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../../api.service';

@Component({
  selector: 'app-cuentas-por-cobrar',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrl: './cuentas-por-cobrar.component.scss'
})
export class CuentasPorCobrarComponent implements AfterViewInit {
  displayedColumns: string[] = ['codigocuentascobrar', 'nombreclientes' , 'numerofactura', 'total_pagado'];
    dataSource = new MatTableDataSource<Cobrar>();
  
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
}

export interface Cobrar {
  nombreclientes: any;
  codigocuentascobrar: any;
  total_pagado: any;
  numerofactura: any;
}

