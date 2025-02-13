import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { UsuarioComponent } from './shared/usuario/usuario.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestion-de-procesos';
}
