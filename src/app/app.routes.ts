import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {path: '',component: HomePageComponent},
    {path: 'Artículos', loadChildren:()=> import('./modules/articulos/articulos.module').then(m=>m.ArticulosModule)}
    
];
