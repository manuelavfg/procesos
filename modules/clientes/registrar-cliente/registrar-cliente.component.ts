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
  selector: 'app-registrar-cliente',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent
{

	articuloForm =  new FormGroup({
		nombreclientes : new FormControl(''),
		 rifclientes: new FormControl(''),
		telefonoclientes: new FormControl(''),
		direccionclientes : new FormControl(''),
		correoclientes : new FormControl(''),
	})

  constructor(private api: APIService){}
  
  onInsert()
  {

    this.api.insert("clientes", "add", this.articuloForm.value).subscribe({next: res=>
      {

        console.log(res)

      }})
      console.log(this.articuloForm.value)

  }


}
