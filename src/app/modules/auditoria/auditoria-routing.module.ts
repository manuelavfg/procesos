import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriaComponent } from './auditoria.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

const routes: Routes = [
  {
    path: '', component: AuditoriaComponent
  },
  {
    path: 'editar-usuario', component: EditarUsuarioComponent
  }, 
  {
    path: 'agg-usuario', component: AgregarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule { }
