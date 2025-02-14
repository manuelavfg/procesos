import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { DetallesDelProovedorComponent } from './detalles-del-proovedor/detalles-del-proovedor.component';

const routes: Routes = [
  {
    path: '', component: ProveedoresComponent
  },
  {
    path: 'detalles', component: DetallesDelProovedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
