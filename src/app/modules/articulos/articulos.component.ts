import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-articulos',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent implements AfterViewInit {
  displayedColumns: string[] = ['producto', 'unidad', 'cantidad', 'codigo', 'precio',  'entrada', 'salida', 'acciones'];
  dataSource = new MatTableDataSource<Articles>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Articles {
  producto: string;
  unidad: string;
  cantidad: number;
  codigo: string;
  precio: number;
  entrada: string;
  salida: string;
}

const ELEMENT_DATA: Articles[] = [
  {producto: 'LAMPARA LED DE ALUMBRADO PÚBLICO 150W 6000K - IP66 - 120° - 100 LMW', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 100, entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'REFLECTOR LED NEGRO DE 200W 6500K IP66 AC 85 - 265 V', unidad: 'PZA', cantidad: 2, codigo: '234BKR ', precio: 100,  entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'CABLE ST 2 X 18 AWG Cu 75°C 600V (PVC )', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 100,  entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'FLEJE DE HIERRO GALBANIZADO CON HEBILLA', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 1,  entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'YP ALUMBRADO PUBLICO', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 10,  entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'LAMPARA LED DE ALUMBRADO PÚBLICO 150W 6000K - IP66 - 120° - 100 LMW', unidad: 'PZA', cantidad: 1, codigo: '234BKR ', precio: 100,  entrada: '10/10/2023', salida: '11/11/2023'},
  {producto: 'REFLECTOR LED NEGRO DE 200W 6500K IP66 AC 85 - 265 V', unidad: 'PZA', cantidad: 2, codigo: '234BKR ', precio: 100,  entrada: '10/10/2023', salida: '11/11/2023'},
 
];
