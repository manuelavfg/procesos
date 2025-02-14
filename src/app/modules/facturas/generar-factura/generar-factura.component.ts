import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generar-factura',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss'
})
export class GenerarFacturaComponent {

}
