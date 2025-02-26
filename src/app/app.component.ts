import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UsuarioComponent } from './shared/usuario/usuario.component';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LogInComponent } from './pages/login/log-in.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato para parsing (opcional)
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato de visualización
    monthYearLabel: 'MMMM YYYY', // Etiqueta de mes/año
    dateA11yLabel: 'LL', // Formato accesible
    monthYearA11yLabel: 'MMMM YYYY', // Etiqueta accesible mes/año
  },
};


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, UsuarioComponent, CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class AppComponent {
  title = 'Sulmezuca';
  
  usuario = true;
	showNav = true;

	public showNavBar = true;

	toggleNavBar(component : Component) {
		 if(component instanceof LogInComponent) {
				this.usuario = false;
				this.showNavBar = false;
		 } else {
			this.usuario = true;
				this.showNavBar = true;
		 }
	}


  // aqui se va a manejar todo lo relacionado al login, logout y demas funcionalidades del usuario
  // en caso de no estar logueado, no se muestra el router outlet, solo el login.
  // en caso de que el usuario cierre sesion, se redirecciona al login nuevamente.
}
