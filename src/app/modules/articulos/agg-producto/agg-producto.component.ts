import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agg-producto',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './agg-producto.component.html',
  styleUrl: './agg-producto.component.scss'
})
export class AggProductoComponent {
}
