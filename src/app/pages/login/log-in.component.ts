import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-log-in',
  imports: [ MatInputModule, MatButtonModule, MatFormFieldModule ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

// Aquí va toda la lógica de autenticación, así como las validaciones del formulario.
// También aquí se va a mandar a llamar el servicio de autenticación y redireccionar a la página principal

}
