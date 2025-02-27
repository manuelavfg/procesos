import { Routes } from '@angular/router';
import { LogInComponent } from './pages/login/log-in.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    
    { path:'', component: LogInComponent },
    
    {path: 'home',loadComponent: () => import('./pages/homepage/home-page.component').then(m=>m.HomePageComponent), },
    {
        path: 'articulos', loadChildren:()=> import('./modules/articulos/articulos.module').then(m=>m.ArticulosModule),
    },
    {
        path: 'facturas', loadChildren:()=> import('./modules/facturas/facturas.module').then(m=>m.FacturasModule),
    },
    {
        path: 'proveedores', loadChildren:()=> import('./modules/proveedores/proveedores.module').then(m=>m.ProveedoresModule), 
    },
    {path: 'clientes', loadChildren:()=> import('./modules/clientes/clientes.module').then(m=>m.ClientesModule), 

    },
    {
        path: 'cuentas-por-pagar', loadComponent: () => import('./modules/cuentas/cuentas-por-pagar/cuentas-por-pagar.component').then(m=>m.CuentasPorPagarComponent),
    },

    {
        path: 'cuentas-por-cobrar', loadComponent: () => import('./modules/cuentas/cuentas-por-cobrar/cuentas-por-cobrar.component').then(m=>m.CuentasPorCobrarComponent),
    },
    {
        path: 'configuracion', loadComponent: () => import('./pages/config/config.component').then(m=>m.ConfigComponent),
    },
    {
        path: 'recuperar-contrasena', loadComponent: () => import('./pages/login/recuperar-contrasena/recuperar-contrasena.component').then(m=>m.RecuperarContrasenaComponent),
    },
    {
        path: 'editar-configuracion', loadComponent: () => import('./pages/config/editar-config/editar-config.component').then(m=>m.EditarConfigComponent),
    },
    {
        path: 'editar-config', loadComponent: () => import('./pages/config/editar-config/editar-config.component').then(m=>m.EditarConfigComponent),
    },
    {
        path:'auditoria', loadChildren:()=> import('./modules/auditoria/auditoria.module').then(m=>m.AuditoriaModule),
    }
    
];
