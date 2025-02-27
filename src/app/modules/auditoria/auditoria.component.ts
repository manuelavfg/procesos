import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auditoria',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AuditoriaComponent implements AfterViewInit{
  displayedColumns: string[] = ['nombre', 'cedula', 'contraseña', 'telefono', 'correo'];
  dataSource = new MatTableDataSource<usuario>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface usuario {
  nombre: string;
  cedula: string;
  contraseña: string;
  telefono: string;
  correo: string;
}

const ELEMENT_DATA: usuario[] = [

 
];


