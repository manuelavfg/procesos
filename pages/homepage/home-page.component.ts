import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  imports: [ MatIconModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  homepage = [
    {
      icono: 'offline_bolt',
      description: 'Gestiona todo el catálogo de productos eléctricos'
    },
    {
      icono: ' insert_drive_file',
      description: 'Genera, visualiza e imprime facturas de ventas'
    },
    {
      icono: ' store_mall_directory',
      description: 'Controla el stock, entradas y salidas de inventario'
    },
    {
      icono: 'list_alt',
      description: 'Gestiona todo el catálogo de productos eléctricos'
    },
    {
      icono: 'person',
      description: 'Registra y gestiona datos y compras de los clientes'
    },
    {
      icono: 'attach_money',
      description: 'Supervisa cuentas por cobrar y por pagar'
    },
  ]

}
