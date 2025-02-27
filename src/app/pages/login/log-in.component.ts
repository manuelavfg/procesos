import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APIService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule, CommonModule, RouterLinkWithHref],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {


  constructor(private api: APIService, private router: Router)
  {

    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
     else {
      console.log('You are on the server')
    }

  }

  loginForm =  new FormGroup({
    correousuario : new FormControl(''),
    contrasenausuarios : new FormControl(''),
  })


public login()
{
  this.api.getlogin(this.loginForm.value.correousuario,this.loginForm.value.contrasenausuarios)
  this.router.navigate(['/home'])
}

}
