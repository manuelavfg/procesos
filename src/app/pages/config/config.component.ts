import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../../api.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [ MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLinkWithHref ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
tasa = 'tasa'
iva = 'iva'
nombre = ' Suministros eléctricos del Zulia, C.A (Sumelzuca)'
correo = 'sumelzuca@gmail.com'
logo = new Image()
logoSrc = '/assets/img/sumelzucalogo.png';
rif = 'J-50206515-6'
crltvfactura = 'FACT-2025'
telefono = '0261-7920000'
crltvpresupuesto = 'PRES-2025'

constructor(private api: APIService) 
{
  let a : any
  let p = {limit: 50}
  this.api.select("config","list",p).subscribe(res=>
  {
      a = res
      this.tasa = a[0]['tasaconfig']
      this.iva = a[0]['ivaconfig']
      this.nombre = a[0]['nombreconfig']
      this.correo = a[0]['correoconfig']
      this.rif = a[0]['rifconfig']
      this.telefono = a[0]['telefonoconfig']
  })
}




}
