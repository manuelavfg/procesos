import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { APIService } from '../../api.service';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-facturasProveedores',
  imports: [ MatPaginator, MatPaginatorModule, MatButtonModule, MatTableModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss',
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ja-JP'}]
})
export class FacturasComponent implements AfterViewInit{
  pagecount:any
  p:any;
  limit = 50;
  offset = 0;
  displayedColumns: string[] = ['codigofactura', 'nombreproveedores','numerofactura' ,'tipofactura','acciones'];
  selectedMode: string = 'proveedores';
  isProveedoresMode: boolean = true; // Modo inicial

  currentDataSource!: MatTableDataSource<any>
  dataSource! : MatTableDataSource<FacturasProveedores>;
  dataSource2! : MatTableDataSource<FacturasClientes>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: APIService,private cdr: ChangeDetectorRef){	
	let p;
	let params= 
	{
		limit : this.limit,
		offset : this.offset,
	}
		this.selectedMode = 'proveedores';
		this.api.select("factura","tableC", params).subscribe(res =>
		{
			this.p = res;
			console.log(res)
			this.dataSource2 = new MatTableDataSource(this.p)
			if (!this.isProveedoresMode) {
				this.currentDataSource = this.dataSource2;
				this.dataSource2.paginator = this.paginator;
			  }
		})
		
		this.api.select("factura","tableP", params).subscribe(res =>
		{
				this.p = res;
				console.log(res)
				this.dataSource = new MatTableDataSource(this.p)
				if (this.isProveedoresMode) {
					this.currentDataSource = this.dataSource;
					this.dataSource.paginator = this.paginator;
				  }
		})}

	ngAfterViewInit() {
		this.selectedMode = 'proveedores';
	}

    abrirReporte()
    {
        this.api.mostrarReporte("asdasdasd")
    }


	cambiarModo(event: MatButtonToggleChange) {
		this.isProveedoresMode = event.value === 'proveedores';
  
		if (this.isProveedoresMode) {
		  this.currentDataSource = this.dataSource;
		  this.displayedColumns = ["codigofactura",'nombreproveedores', 'tipofactura','numerofactura','fechaemision','acciones']; // Columnas de proveedores
          if(this.dataSource != null){this.dataSource.paginator = this.paginator;}

		} else {
		  this.currentDataSource = this.dataSource2;
		  this.displayedColumns = ["codigofactura",'nombreclientes', 'tipofactura','numerofactura','fechaemision','acciones']; // Columnas de clientes
          if(this.dataSource2 != null){this.dataSource2.paginator = this.paginator;}

		}
		this.cdr.detectChanges()
	  }
}

export interface FacturasProveedores {
  idfactura:any,
  codigofactura: any;
  idproveedorfactura: any;
  nombreproveedores: any;
  tipofactura: any;
}

export interface FacturasClientes {
	idfactura:any,
	codigofactura: any;
	idcliente: any;
	nombreclientes: any;
	tipofactura: any;
  }

