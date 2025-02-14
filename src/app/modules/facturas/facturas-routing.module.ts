import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './facturas.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';

const routes: Routes = [
  {
    path: '', component: FacturasComponent
  },
  {
    path: 'generar-factura', component: GenerarFacturaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
