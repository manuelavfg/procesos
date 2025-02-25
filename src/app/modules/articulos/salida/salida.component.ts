import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-salida',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatTableModule],
  templateUrl: './salida.component.html',
  styleUrl: './salida.component.scss'
})
export class SalidaComponent {

  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];


}
