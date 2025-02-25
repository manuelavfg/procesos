import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-proovedor',
  imports: [ MatFormFieldModule,MatIconModule,MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './editar-proovedor.component.html',
  styleUrl: './editar-proovedor.component.scss'
})
export class EditarProovedorComponent {

}
