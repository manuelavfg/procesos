import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cuentas-por-pagar',
  imports: [ MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule ],
  templateUrl: './cuentas-por-pagar.component.html',
  styleUrl: './cuentas-por-pagar.component.scss'
})
export class CuentasPorPagarComponent implements AfterViewInit {
  displayedColumns: string[] = ['proveedor', 'factura', 'monto', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Pagar>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Pagar {
  proveedor: string;
  factura: string;
  monto: string;
  fecha: string;
  estado: string;
}

const ELEMENT_DATA: Pagar[] = [
  {proveedor: 'Electro Suministros', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  {proveedor: 'Electro Suministros', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  {proveedor: 'Electro Suministros', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
  {proveedor: 'Electro Suministros', factura: '#PROV-4561', monto: '$150.00', fecha: '10/02/2025', estado: 'Pendiente'},
 
];
