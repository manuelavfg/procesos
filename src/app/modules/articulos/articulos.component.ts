import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-articulos',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent implements AfterViewInit {
  displayedColumns: string[] = ['producto', 'unidad', 'cantidad', 'codigo', 'precio', 'acciones'];
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
}

const ELEMENT_DATA: Articles[] = [
  {producto: 'LAMPARA LED DE ALUMBRADO PÚBLICO 150W 6000K - IP66 - 120° - 100 LMW', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 100},
  {producto: 'REFLECTOR LED NEGRO DE 200W 6500K IP66 AC 85 - 265 V', unidad: 'PZA', cantidad: 2, codigo: '234BKR ', precio: 100},
  {producto: 'CABLE ST 2 X 18 AWG Cu 75°C 600V (PVC )', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 100},
  {producto: 'FLEJE DE HIERRO GALBANIZADO CON HEBILLA', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 1},
  {producto: 'YP ALUMBRADO PUBLICO', unidad: 'PZA', cantidad: 10, codigo: '234BKR ', precio: 10},
  {producto: 'LAMPARA LED DE ALUMBRADO PÚBLICO 150W 6000K - IP66 - 120° - 100 LMW', unidad: 'PZA', cantidad: 1, codigo: '234BKR ', precio: 100},
  {producto: 'REFLECTOR LED NEGRO DE 200W 6500K IP66 AC 85 - 265 V', unidad: 'PZA', cantidad: 2, codigo: '234BKR ', precio: 100},
 
];
