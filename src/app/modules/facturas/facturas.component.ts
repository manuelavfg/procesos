import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-facturas',
  imports: [ MatPaginator, MatPaginatorModule, MatButtonModule, MatTableModule, MatIconModule ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements AfterViewInit{
 displayedColumns: string[] = ['cliente', 'factura', 'estado', 'metodo', 'acciones'];
  dataSource = new MatTableDataSource<Facturas>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Facturas {
  cliente: string;
  factura: string;
  estado: string;
  metodo: string;
}

const ELEMENT_DATA: Facturas[] = [
  {cliente: 'Tecnologias avanzadas', factura: '0977', estado: 'pagada', metodo: 'Transferencia'},
  {cliente: 'Tecnologias avanzadas', factura: '0977', estado: 'pagada', metodo: 'Transferencia'},
  {cliente: 'Tecnologias avanzadas', factura: '0977', estado: 'pagada', metodo: 'Transferencia'},
 
];
