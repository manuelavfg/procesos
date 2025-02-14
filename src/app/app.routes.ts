import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage/home-page.component';

export const routes: Routes = [
    {
        path: '', component: HomePageComponent
    },
    {
        path: 'articulos', loadChildren:()=> import('./modules/articulos/articulos.module').then(m=>m.ArticulosModule)
    },
    {
        path: 'facturas', loadChildren:()=> import('./modules/facturas/facturas.module').then(m=>m.FacturasModule)
    },
    {
        path: 'almacen', loadChildren:()=> import('./modules/almacen/almacen.module').then(m=>m.AlmacenModule)
    },
    {
        path: 'proveedores', loadChildren:()=> import('./modules/proveedores/proveedores.module').then(m=>m.ProveedoresModule)
    },
    {
        path: 'clientes', loadChildren:()=> import('./modules/clientes/clientes.module').then(m=>m.ClientesModule)
    },
    {
        path: 'cuentas-por-pagar', loadComponent: () => import('./modules/cuentas/cuentas-por-pagar/cuentas-por-pagar.component').then(m=>m.CuentasPorPagarComponent)
    },

        {
        path: 'cuentas-por-cobrar', loadComponent: () => import('./modules/cuentas/cuentas-por-cobrar/cuentas-por-cobrar.component').then(m=>m.CuentasPorCobrarComponent)
    },
];
