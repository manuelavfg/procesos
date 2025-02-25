import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { APIService } from '../../../api.service';
import { CommonModule } from '@angular/common';


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
		nombreclientes : new FormControl(''),
		rifclientes: new FormControl(''),
		telefonoclientes: new FormControl(''),
		direccionclientes : new FormControl(''),
		correoclientes : new FormControl(''),
	})

  constructor(private api: APIService)
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

	this.articuloForm.value.idclientes = this.indiceSeleccionado

    this.api.update("clientes", "update", this.articuloForm.value).subscribe({next: res=>
      {

        console.log(res)

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
