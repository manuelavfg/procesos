import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-recuperar-contrasena',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, RouterLinkWithHref],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.scss'
})
export class RecuperarContrasenaComponent {

  recoveryForm =  new FormGroup({
    correo : new FormControl(),
  })

  constructor(private api:APIService){}

  onInsert()
  {
      
    this.api.insert("usuario","recovery",this.recoveryForm.value).subscribe(res =>
    {
        console.log(res)
        this.api.getrecovery(res)
    })

  }

  prueba()
  {
    const valorString = localStorage.getItem('recovery');
    let valor = valorString ? JSON.parse(valorString) : null;
    console.log(valor)
    this.api.insert("usuario", "checkHora", valor).subscribe(res=>
    {

        console.log(res)

    })
    }
}

interface MiObjeto {
  codigo: number;
  error:any
  hora: any;
  success: any
}