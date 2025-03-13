import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage/home-page.component';
import { LogInComponent } from './pages/login/log-in.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    
    { path:'', component: LogInComponent },
    {path: 'home',loadComponent: () => import('./pages/homepage/home-page.component').then(m=>m.HomePageComponent), canActivate:[AuthGuard]},
    {
        path: 'articulos', loadChildren:()=> import('./modules/articulos/articulos.module').then(m=>m.ArticulosModule),canActivate:[AuthGuard]
    },
    {
        path: 'facturas', loadChildren:()=> import('./modules/facturas/facturas.module').then(m=>m.FacturasModule),canActivate:[AuthGuard]
    },
    {
        path: 'proveedores', loadChildren:()=> import('./modules/proveedores/proveedores.module').then(m=>m.ProveedoresModule), canActivate:[AuthGuard]
    },
    {   
        path: 'clientes', loadChildren:()=> import('./modules/clientes/clientes.module').then(m=>m.ClientesModule), canActivate:[AuthGuard]},
    {
        path: 'cuentas-por-pagar', loadComponent: () => import('./modules/cuentas/cuentas-por-pagar/cuentas-por-pagar.component').then(m=>m.CuentasPorPagarComponent),canActivate:[AuthGuard]
    },

    {
        path: 'cuentas-por-cobrar', loadComponent: () => import('./modules/cuentas/cuentas-por-cobrar/cuentas-por-cobrar.component').then(m=>m.CuentasPorCobrarComponent),canActivate:[AuthGuard]
    },
    {
        path: 'configuracion', loadComponent: () => import('./pages/config/config.component').then(m=>m.ConfigComponent),canActivate:[AuthGuard]
    },
    {
        path: 'recuperar-contrasena', loadComponent: () => import('./pages/login/recuperar-contrasena/recuperar-contrasena.component').then(m=>m.RecuperarContrasenaComponent),
    },
    {
        path: 'editar-configuracion', loadComponent: () => import('./pages/config/editar-config/editar-config.component').then(m=>m.EditarConfigComponent), canActivate:[AuthGuard]
    },
    {
        path: 'editar-config', loadComponent: () => import('./pages/config/editar-config/editar-config.component').then(m=>m.EditarConfigComponent),canActivate:[AuthGuard]
    },
    {
        path:'auditoria', loadChildren:()=> import('./modules/auditoria/auditoria.module').then(m=>m.AuditoriaModule),canActivate:[AuthGuard]
    },
    {
        path:'reestablecer-contrasena', loadComponent:()=> import('./pages/login/reestablecer-contrasena/reestablecer-contrasena.component').then(m=>m.ReestablecerContrasenaComponent),
    },
    {
        path:'auth-codigo', loadComponent:()=> import('./pages/login/auth-codigo/auth-codigo.component').then(m=>m.AuthCodigoComponent),
    },
    {
        path:'facturacion', loadComponent:()=> import('./modules/facturas/facturacion/facturacion.component').then(m=>m.FacturacionComponent),
    },

];
