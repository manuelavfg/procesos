import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { DetallesDelProovedorComponent } from './detalles-del-proovedor/detalles-del-proovedor.component';
import { EditarProovedorComponent } from './editar-proovedor/editar-proovedor.component';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';
import { AggProveedorComponent } from './agg-proveedor/agg-proveedor.component';

const routes: Routes = [
  {
    path: '', component: ProveedoresComponent
  },
  {
    path: 'detalles', component: DetallesDelProovedorComponent
  },
  {
    path: 'editar-proovedor', component: EditarProovedorComponent
  },
  {
    path: 'realizar-pedido', component: RealizarPedidoComponent
  },
  {
    path:'agregar-proveedor', component: AggProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
