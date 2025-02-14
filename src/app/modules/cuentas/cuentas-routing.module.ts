import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasPorPagarComponent } from './cuentas-por-pagar/cuentas-por-pagar.component';
import { CuentasPorCobrarComponent } from './cuentas-por-cobrar/cuentas-por-cobrar.component';

const routes: Routes = [
  {
    path: 'cuentas-por-pagar', component: CuentasPorPagarComponent
  },
  {
    path: 'cuentas-por-cobrar', component: CuentasPorCobrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule { }
