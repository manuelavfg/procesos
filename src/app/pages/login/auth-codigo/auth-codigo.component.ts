import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-auth-codigo',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],

  templateUrl: './auth-codigo.component.html',
  styleUrl: './auth-codigo.component.scss'
})
export class AuthCodigoComponent {

  recoveryForm =  new FormGroup({
    correo : new FormControl('',[Validators.required,Validators.maxLength(6)]),
  })

  constructor(private api:APIService, private router: Router){}

  onInsert()
  {
      
    this.api.insert("usuario","recovery",this.recoveryForm.value).subscribe(res =>
    {
        this.api.getrecovery(res)
    })

  }

  prueba()
  {
    const valorString = localStorage.getItem('recovery');
    let valor = valorString ? JSON.parse(valorString) : null;
    let p:any
    let a = this.recoveryForm.value.correo
    this.api.insert("usuario", "checkHora", valor).subscribe(res=>
    {
        p = res
        if(p['success'] && a == valor['codigo'])
        {
          this.router.navigate(['/reestablecer-contrasena'])
        }
        else{this.api.mostrarError(p['mensaje'])}


    })
    }
}

interface MiObjeto {
  codigo: number;
  error:any
  hora: any;
  success: any
}