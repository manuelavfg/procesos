import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';

const routes: Routes = [
  {
    path: '', component: ClientesComponent
  },
  {
    path: 'editar-cliente', component: EditarClienteComponent
  },
  {
    path: 'registrar-cliente', component: RegistrarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
