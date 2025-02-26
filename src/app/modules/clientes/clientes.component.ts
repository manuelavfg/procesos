import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { APIService } from '../../api.service';

export interface Clientes {
  nombreclientes: string;
  rifclientes: string;
  telefonoclientes: string;
  direccionclientes:string;
  correoclientes: string;

}

@Component({
  selector: 'app-clientes',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
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


		this.api.select("clientes","list", params).subscribe(res =>
		{
			this.p = res;
			this.dataSource = new MatTableDataSource(this.p)
			this.dataSource.paginator = this.paginator;
		})
	}
	


}



