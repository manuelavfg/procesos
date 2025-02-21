import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos.component';
import { AggProductoComponent } from './agg-producto/agg-producto.component';
import { RegistrarEntradaComponent } from './registrar-entrada/registrar-entrada.component';
import { SalidaComponent } from './salida/salida.component';

const routes: Routes = [
  {
    path: '', component: ArticulosComponent
  },
  {
    path: 'agregar-producto', component: AggProductoComponent
  },
  {
    path: 'registrar-entrada', component: RegistrarEntradaComponent
  },
  {
    path: 'registrar-salida', component: SalidaComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { 

}
