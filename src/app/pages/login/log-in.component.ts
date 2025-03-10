import { AfterViewInit, Component, NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APIService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@Component({
    
  selector: 'app-log-in',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule, CommonModule, RouterLinkWithHref, MatIconModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',


})
export class LogInComponent implements AfterViewInit {

  hide = true

  ngAfterViewInit(): void
  {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
     else {
      console.log('You are on the server')
    }
  }


  constructor(private api: APIService, private router: Router)
  {



  }

  loginForm =  new FormGroup({
    correousuario : new FormControl('',[Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),

        contrasenausuarios: new FormControl('',[Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),
  })


public login()
{
  if(!this.loginForm.valid){this.api.mostrarError("Error: Usuario o Contraseña incorrecta"); return;}
  this.api.insert("usuario","auth", this.loginForm.value).subscribe({next:(res)=>
  {

    this.api.getlogin(res)
    let p: any = res
    console.log(p)
    if(p['cargousuario'] == 1){this.api.setHideElement(true); console.log(true)} else{this.api.setHideElement(false); console.log(false)}
    this.router.navigate(['/home']) 
  }})
}



}
