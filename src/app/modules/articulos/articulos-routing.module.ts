import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos.component';
import { AggProductoComponent } from './agg-producto/agg-producto.component';

const routes: Routes = [
  {
    path: '', component: ArticulosComponent
  },
  {
    path: 'agregar-producto', component: AggProductoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { 

}
