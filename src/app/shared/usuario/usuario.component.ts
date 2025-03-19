import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  correo:any = ""
  nombre:any = ""

  constructor(private api: APIService)
  {
      if (typeof window !== 'undefined' && localStorage !== undefined) 
{
let p = localStorage.getItem("cuenta")

let a = p ? JSON.parse(p) : null;
this.correo = a['correousuario']
this.nombre = a['nombreusuario']
}
  }

}
