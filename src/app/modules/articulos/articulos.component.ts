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
	selector: 'app-articulos',
	imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, FormsModule , MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
	templateUrl: './articulos.component.html',
	styleUrl: './articulos.component.scss'
})
export class ArticulosComponent implements AfterViewInit{
	dataSource = new MatTableDataSource<Articles>();
	pagecount:any
	p:any;
	limit = 50;
	offset = 0;
	displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo','entradaarticulo','salidaarticulo'];
	
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
	
	
	constructor(private api: APIService, public router:Router)
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
        
    searchTerm: string = '';
    
      // Carga datos desde la API
      loadData() {
        let p = {searchTerm: this.searchTerm}
        this.api.select("articulo","search",p).subscribe(res=>{
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