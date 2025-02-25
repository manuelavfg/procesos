import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-config',
  imports: [ MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
tasa = 'tasa'
correo = 'correo'
logo = new Image()
logoSrc = '/assets/img/sumelzucalogo.png';
rif = 'rif'
crltvfactura = 'crltvfactura'
crltvpresupuesto = 'crltvpresupuesto'

constructor(private api: APIService) {

  this.logo.src = '/assets/img/sumelzucalogo.png'
  this.logo.loading = 'lazy'
  this.logo.width = 200
  this.logo.height = 200

}

}
