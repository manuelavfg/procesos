import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarConfigComponent } from './editar-config/editar-config.component';

const routes: Routes = [
  {
    path: 'editar', component: EditarConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
