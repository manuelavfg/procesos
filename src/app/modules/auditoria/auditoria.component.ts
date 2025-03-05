import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-auditoria',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AuditoriaComponent implements AfterViewInit{
  displayedColumns: string[] = ['nombreusuario', 'cedulausuario', 'correousuario', 'telefonousuario','cargopermiso'];
  dataSource = new MatTableDataSource<usuario>;

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

}

export interface usuario {
  nombreusuario: string;
  cedulausuario: string;
  correousuario: string;
  telefonousuario: string;
  cargopermiso: string;
}

