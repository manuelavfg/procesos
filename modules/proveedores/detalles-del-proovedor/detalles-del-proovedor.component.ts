import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../../api.service';

@Component({
  selector: 'app-detalles-del-proovedor',
  imports: [ MatTableModule, MatButtonModule, MatIconModule, MatPaginator, MatPaginatorModule],
  templateUrl: './detalles-del-proovedor.component.html',
  styleUrl: './detalles-del-proovedor.component.scss'
})
export class DetallesDelProovedorComponent implements AfterViewInit{
    displayedColumns: string[] = ['nombre', 'rif', 'telefono', 'direccion', 'estado'];
    displayedColumns2: string[] = ['producto', 'cantidad', 'precio', 'entrega'];
    dataSource = new MatTableDataSource<proveedor>(ELEMENT_DATA);
    dataSource2 = new MatTableDataSource<articulos>(ELEMENT_DATA2);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    constructor(private api:APIService)
    {
      console.log()
    }

  }
  
  export interface proveedor {
    nombre: string;
    rif: string;
    telefono: string;
    direccion: string;
    estado: string;
  }

  export interface articulos{
    producto: string;
    cantidad: string;
    precio: string;
    entrega: string;
  }
  
  const ELEMENT_DATA: proveedor[] = [
    {nombre: 'Tecnologias avanzadas', rif: 'J-12345678-9', telefono: '0412-3456789', direccion: 'Av. Siempre Viva, Caracas', estado: 'Activo'},
  ];

  const ELEMENT_DATA2: articulos[] = [
    {producto: 'Disipadores', cantidad: '50', precio: 'Bs. 500.000', entrega: '30/10/2023'},
    {producto: 'Disipadores', cantidad: '50', precio: 'Bs. 500.000', entrega: '30/10/2023'},
    {producto: 'Disipadores', cantidad: '50', precio: 'Bs. 500.000', entrega: '30/10/2023'},
  ];
