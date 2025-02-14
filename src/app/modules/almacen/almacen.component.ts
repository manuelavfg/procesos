import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-almacen',
  imports: [ MatPaginator, MatPaginatorModule, MatButtonModule, MatTableModule, MatIconModule ],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements AfterViewInit{
 displayedColumns: string[] = ['producto', 'cantidad', 'categoria', 'entrada', 'salida'];
  dataSource = new MatTableDataSource<Facturas>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Facturas {
  producto: string;
  cantidad: string;
  categoria: string;
  entrada: string;
  salida: string;
}

const ELEMENT_DATA: Facturas[] = [
  {producto: 'LÁMPARA LED DE ALUMBRADO PÚBLICO 150W', cantidad: '50', categoria: 'Iluminación', entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'LÁMPARA LED DE ALUMBRADO PÚBLICO 150W', cantidad: '50', categoria: 'Iluminación', entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'LÁMPARA LED DE ALUMBRADO PÚBLICO 150W', cantidad: '50', categoria: 'Iluminación', entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'LÁMPARA LED DE ALUMBRADO PÚBLICO 150W', cantidad: '50', categoria: 'Iluminación', entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'LÁMPARA LED DE ALUMBRADO PÚBLICO 150W', cantidad: '50', categoria: 'Iluminación', entrada: '10/10/2023', salida: '11/11/2023'},
 
];
