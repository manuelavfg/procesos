import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { ReestablecerContrasenaComponent } from './reestablecer-contrasena/reestablecer-contrasena.component';
import { AuthCodigoComponent } from './auth-codigo/auth-codigo.component';

const routes: Routes = [
  {
      path: 'recuperar', component: RecuperarContrasenaComponent
    },
    {
      path: 'reestablecer', component: ReestablecerContrasenaComponent,
    },
    {
      path: 'authcodigo', component: AuthCodigoComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
