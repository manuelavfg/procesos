import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-cliente',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent
{

	nombres : any[] = [];
	
	opcionSeleccionada: any
 	indiceSeleccionado: any

  articuloForm =  new FormGroup({
    idclientes: new FormControl(''),
		nombreclientes : new FormControl('',[Validators.required, Validators.minLength(2), 
            Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),
		rifclientes: new FormControl('',[Validators.required,Validators.pattern(/^[JVEPGC]-\d{8,9}-\d$/)]),
		telefonoclientes: new FormControl('',[Validators.required,
            Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
		direccionclientes : new FormControl(''),
		correoclientes : new FormControl('',[Validators.required,Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
        ]),
	})

  constructor(private api: APIService, private router: Router)
  {

    let params =
		{
			limit:50
		}

		this.api.select("clientes", "dropdown",params).subscribe({next: res=>{


			for(let i of Object.values(res))
				{
					this.nombres.push(i.nombreclientes)
					console.log(this.nombres)
				}


		}})

  }
  
  onInsert()
  {
    if(this.articuloForm.valid){this.api.mostrarError("Formulario invalido")}
	this.articuloForm.value.idclientes = this.indiceSeleccionado

    this.api.update("clientes", "update", this.articuloForm.value).subscribe({next: res=>
      {

        console.log(res)
        this.api.mostrarExito("Operacion Exitosa")
        this.router.navigate(['/clientes']) 
      }})
      console.log(this.articuloForm.value)

  }


  public getDropdown()
	{
		if (this.opcionSeleccionada) {
			this.indiceSeleccionado = this.nombres.indexOf(this.opcionSeleccionada)+1;
			console.log(this.indiceSeleccionado)
		  } else {
			this.indiceSeleccionado = null;
		  }
	}


}
