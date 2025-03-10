import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';
import { Router } from '@angular/router';


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
    contrasena1: new FormControl('',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),

    contrasena2: new FormControl('',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),
  })
  correo:any

  constructor(private api:APIService, private router:Router)
  { 
    this.correo = this.api.sendcorreo()
    console.log(this.correo)
  }

  onInsert()
  {
    let c:any
    if(this.recoveryForm.value.contrasena1 !== this.recoveryForm.value.contrasena2){this.api.mostrarError("Error: Contraseñas Diferentes"); return}
    c = this.recoveryForm.value.contrasena1
    let a = {correousuario: this.correo, contrasenausuarios:c}
    this.api.update("usuario","updateContrasena", a).subscribe({next:(res)=>
    {
        console.log(res)
        this.api.mostrarExito("Contraseña Reestablecida")
        this.router.navigate(['']) 
    }})
  }

}


interface MiObjeto {
  codigo: number;
  error:any
  hora: any;
  success: any
}