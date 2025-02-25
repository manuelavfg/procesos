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
    {path: 'clientes', loadChildren:()=> import('./modules/clientes/clientes.module').then(m=>m.ClientesModule), canActivate:[AuthGuard]},
    {
        path: 'cuentas-por-pagar', loadComponent: () => import('./modules/cuentas/cuentas-por-pagar/cuentas-por-pagar.component').then(m=>m.CuentasPorPagarComponent),canActivate:[AuthGuard]
    },

    {
        path: 'cuentas-por-cobrar', loadComponent: () => import('./modules/cuentas/cuentas-por-cobrar/cuentas-por-cobrar.component').then(m=>m.CuentasPorCobrarComponent),canActivate:[AuthGuard]
    },
    {
        path: 'configuracion', loadComponent: () => import('./pages/config/config.component').then(m=>m.ConfigComponent),canActivate:[AuthGuard]
    },
];
