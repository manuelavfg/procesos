import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-articulos',
	imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
	templateUrl: './articulos.component.html',
	styleUrl: './articulos.component.scss'
})
export class ArticulosComponent implements AfterViewInit{
	pagecount:any
	p:any;
	limit = 50;
	offset = 0;
	displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
	dataSource! : MatTableDataSource<Articles>;
	
	onPageChange(event:PageEvent)
	{
		this.offset = this.offset+5;
		this.api.select("articulo","list", [this.limit, this.offset]).subscribe(res =>
			{
				this.p = res;
				this.dataSource = new MatTableDataSource(this.p)
				this.dataSource.paginator = this.paginator;
			})
		
	}
	
	
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	
	
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


		this.api.select("articulo","list", params).subscribe(res =>
		{
			this.p = res;
			this.dataSource = new MatTableDataSource(this.p)
			this.dataSource.paginator = this.paginator;
		})
	}
	
	
}

export interface Articles {
	idarticulo: any,
	descripcionarticulo: any,
	tipoarticulo: any,
	codigoarticulo: any,
	costoarticulo: any,
	existenciaarticulo: any,
	ultimaEntradaarticulo : any
	ultimaSalidaarticulo : any
	proveedoresidproveedores: any,
	
}