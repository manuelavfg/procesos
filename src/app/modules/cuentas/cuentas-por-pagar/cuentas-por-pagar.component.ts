import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../../api.service';

@Component({
  selector: 'app-cuentas-por-pagar',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './cuentas-por-pagar.component.html',
  styleUrl: './cuentas-por-pagar.component.scss'
})
export class CuentasPorPagarComponent implements AfterViewInit {
  displayedColumns: string[] = ['codigocuentaspagar', 'nombreproveedores' , 'numerofactura', 'total_pagado'];
  dataSource = new MatTableDataSource<Pagar>();

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


    this.api.select("cuentasporpagar","list", params).subscribe(res =>
    {
      p = res;
      this.dataSource = new MatTableDataSource(p)
			this.dataSource.paginator = this.paginator;
    })
  }

}

export interface Pagar {
  nombreproveedores: any;
  codigocuentaspagar: any;
  total_pagado: any;
  numerofactura: any;
  //fecha: string;
  //estado: string;
}