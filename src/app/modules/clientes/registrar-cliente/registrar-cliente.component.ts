import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-cliente',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent
{

	articuloForm =  new FormGroup({
		nombreclientes : new FormControl('',[Validators.required, Validators.minLength(2), 
            Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),
		rifclientes: new FormControl('',[Validators.required,Validators.pattern(/^[JVEPGC]-\d{8,9}-\d$/)]),
		telefonoclientes: new FormControl('',[Validators.required,
            Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
		direccionclientes : new FormControl('', [Validators.required]),
		correoclientes : new FormControl('',[Validators.required,Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
        ]),
	})

  constructor(private api: APIService, private router: Router){}
  
  onInsert()
  {
        const regex = /^[JVEPGC]-\d{8,9}-\d$/;
        console.log(regex.test('J-50206515-6'));
      console.log(this.articuloForm.value.rifclientes)
    if(!this.articuloForm.valid){this.api.mostrarError("Formulario invalido"); return}
    this.api.mostrarExito("Operacion Exitosa")
    this.api.insert("clientes", "add", this.articuloForm.value).subscribe({next: res=>
      {

        console.log(res)
        this.api.mostrarExito("Operacion Exitosa")
        this.router.navigate(['/clientes']) 
      }})
      console.log(this.articuloForm.value)

  }


}
