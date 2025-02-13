import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage/home-page.component';

export const routes: Routes = [
    {
        path: '', component: HomePageComponent
    },
    {
        path: 'articulos', loadChildren:()=> import('./modules/articulos/articulos.module').then(m=>m.ArticulosModule)
    },
    
];
