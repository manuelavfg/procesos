import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './facturas.component';
import { GenerarFacturaComponent } from './generar-factura/generar-factura.component';
import { RegistrarEntradaComponent } from './registrar-entrada/registrar-entrada.component';
import { SalidaComponent } from './salida/salida.component';

const routes: Routes = [
    {
        path: '', component: FacturasComponent
    },
    {
      path: 'registrar-entrada', component: RegistrarEntradaComponent
    },
    {
      path: 'registrar-salida', component: SalidaComponent
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
