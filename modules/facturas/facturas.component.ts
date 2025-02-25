import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { APIService } from '../../api.service';

@Component({
  selector: 'app-facturas',
  imports: [ MatPaginator, MatPaginatorModule, MatButtonModule, MatTableModule, MatIconModule ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements AfterViewInit{
  pagecount:any
  p:any;
  limit = 50;
  offset = 0;
  displayedColumns: string[] = ['codigofactura', 'nombreproveedores', 'tipofactura'];
  dataSource! : MatTableDataSource<Facturas>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: APIService){}

	ngAfterViewInit() {
		let p;
		let params= 
		{
			limit : this.limit,
			offset : this.offset,
		}


		this.api.select("factura","list", params).subscribe(res =>
		{
			this.p = res;
			this.dataSource = new MatTableDataSource(this.p)
			this.dataSource.paginator = this.paginator;
		})
	}

	public printTable() {

		const doc = new jspdf('p', 'mm', 'a4'); 
		var articulo: any[] = []
		
		this.api.select("articulo","factura",[1]).subscribe({next:(value)=>
		{
			let datos;
			for(let i of Object.values(value)){
				
				datos = 
				[
					[i.descripcionarticulo,
					i.tipoarticulo,
					i.existenciaarticulo,
					i.costoarticulo,
					(i.existenciaarticulo*i.costoarticulo)
					]
				]
			}
			console.log(datos)
			
			const gead = [["DESCRIPCION",'UNIDAD','CANT','PRECIO UNIT','TOTAL']]
			autoTable(doc,{
				head:gead,
				body:datos,
				theme:'grid'
			})
			doc.save("asdads")
			
		}})
	}


}

export interface Facturas {
  idfactura:any,
  idcliente:any,
  idarticulofactura:any,
  codigofactura: any;
  idproveedorfactura: any;
  nombreproveedores: any;
  tipofactura: any;
}

