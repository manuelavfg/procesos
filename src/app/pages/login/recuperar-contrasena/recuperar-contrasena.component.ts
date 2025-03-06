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
  selector: 'app-recuperar-contrasena',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.scss'
})
export class RecuperarContrasenaComponent {

  recoveryForm =  new FormGroup({
    correo : new FormControl('',[Validators.required,Validators.email]),
  })

  constructor(private api:APIService, private router: Router){}

  onInsert()
  {
    let p:any
    this.api.insert("usuario","recovery",this.recoveryForm.value).subscribe({next: (res)=>{
      p = res
      this.api.getrecovery(res)
      if(p['auth'] == false){alert(p['message']); return}
      this.api.getcorreo(this.recoveryForm.value.correo)
      this.router.navigate(['/auth-codigo'])
  }})

  }

  prueba()
  {
    const valorString = localStorage.getItem('recovery');
    let valor = valorString ? JSON.parse(valorString) : null;
    let p:any
    let a = this.recoveryForm.value.correo
    console.log(valor)
    this.api.insert("usuario", "checkHora", valor).subscribe(res=>
    {
        console.log(res)
        p = res
        if(p[0]['success'])
        {
          console.log(valor['codigo'])
        }


    })
    }
}

interface MiObjeto {
  codigo: number;
  error:any
  hora: any;
  success: any
}