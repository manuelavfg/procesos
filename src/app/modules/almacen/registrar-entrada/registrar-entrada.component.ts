import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registrar-entrada',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './registrar-entrada.component.html',
  styleUrl: './registrar-entrada.component.scss'
})
export class RegistrarEntradaComponent {

// aquí vas a manejar toda la lógica del formulario incluyendo las validaciones de los campos
// además de mandar a llamar al servicio para hacer el registro de entrada al inventario
// y posteriormente redireccionar a la vista de almacen.

}
