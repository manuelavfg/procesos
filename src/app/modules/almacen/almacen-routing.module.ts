import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './almacen.component';
import { RegistrarEntradaComponent } from './registrar-entrada/registrar-entrada.component';
import { SalidaComponent } from './salida/salida.component';

const routes: Routes = [
  {
    path: '', component: AlmacenComponent
  },
  {
    path: 'entrada', component: RegistrarEntradaComponent
  },
  {
    path: 'salida', component: SalidaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
