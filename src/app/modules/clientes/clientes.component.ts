import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-clientes',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['cliente', 'telefono', 'compras', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Clients>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Clients {
  cliente: string;
  telefono: string;
  compras: string;
  estado: string;
}

const ELEMENT_DATA: Clients[] = [
  { cliente: 'Jose Lopez', telefono: '0612345678', compras: '$2.000', estado: 'Activo'},
  { cliente: 'Maria Fernanda', telefono: '0612345678', compras: '$1.000', estado: 'Activo'},
  { cliente: 'Carmen Lucia', telefono: '0612345678', compras: '$800', estado: 'Inactivo'},
  { cliente: 'Jaime Urrego', telefono: '0612345678', compras: '$2.500', estado: 'Activo'},
  { cliente: 'Andres Rojas', telefono: '0612345678', compras: '$1.200', estado: 'Activo'},
  { cliente: 'Sofia Gomez', telefono: '0612345678', compras: '$900', estado: 'Inactivo'},

 
];

