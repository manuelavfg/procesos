import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos.component';
import { AggProductoComponent } from './agg-producto/agg-producto.component';
import { EditarProdcutoComponent } from './editar-prodcuto/editar-prodcuto.component';

const routes: Routes = [
  {
    path: '', component: ArticulosComponent
  },
  {
    path: 'agregar-producto', component: AggProductoComponent
  },

  {
    path: 'editar-producto', component: EditarProdcutoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { 

}
