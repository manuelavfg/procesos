import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UsuarioComponent } from './shared/usuario/usuario.component';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, UsuarioComponent, CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
