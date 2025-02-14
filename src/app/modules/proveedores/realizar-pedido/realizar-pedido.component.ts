import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-realizar-pedido',
  imports: [ MatFormFieldModule,MatIconModule,MatInputModule, MatButtonModule, MatSelectModule ],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.scss'
})
export class RealizarPedidoComponent {

}
