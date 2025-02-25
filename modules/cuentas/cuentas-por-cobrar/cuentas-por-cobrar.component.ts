import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cuentas-por-cobrar',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrl: './cuentas-por-cobrar.component.scss'
})
export class CuentasPorCobrarComponent implements AfterViewInit {
  displayedColumns: string[] = ['cliente', 'factura', 'monto', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Cobrar>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Cobrar {
  cliente: string;
  factura: string;
  monto: string;
  fecha: string;
  estado: string;
}

const ELEMENT_DATA: Cobrar[] = [
  { cliente: 'Juan Peréz', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  { cliente: 'Juan Peréz', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  { cliente: 'Juan Peréz', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  { cliente: 'Juan Peréz', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
 
];

