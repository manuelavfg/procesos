import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';


@Component({
  selector: 'app-reestablecer-contrasena',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reestablecer-contrasena.component.html',
  styleUrl: './reestablecer-contrasena.component.scss'
})
export class ReestablecerContrasenaComponent {
  hide = true
  hide2 = true
  recoveryForm =  new FormGroup({
    contrasena1 : new FormControl(),
    contrasena2 : new FormControl(),
  })
  correo:any

  constructor(private api:APIService)
  { 
    this.correo = this.api.sendcorreo()
    console.log(this.correo)
  }

  onInsert()
  {
    let c:any
    if(this.recoveryForm.value.contrasena1 !== this.recoveryForm.value.contrasena2){alert("Error: Contraseñas Diferentes"); return}
    c = this.recoveryForm.value.contrasena1
    let a = {correousuario: this.correo, contrasenausuarios:c}
    this.api.update("usuario","updateContrasena", a).subscribe({next:(res)=>
    {
        console.log(res)
    }})
  }

}


interface MiObjeto {
  codigo: number;
  error:any
  hora: any;
  success: any
}