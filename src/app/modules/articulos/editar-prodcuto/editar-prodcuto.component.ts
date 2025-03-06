import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';

@Component({
  selector: 'app-editar-prodcuto',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption],

  templateUrl: './editar-prodcuto.component.html',
  styleUrl: './editar-prodcuto.component.scss'
})
export class EditarProdcutoComponent {

  idarticulo: any[] = []
  articulos : any[] = [];
  
  opcionSeleccionada: any
  indiceSeleccionado: any
  articuloForm =  new FormGroup({
    descripcionarticulo : new FormControl("",[Validators.required]),
    idarticulo : new FormControl('',[Validators.required]),
    tipoarticulo: new FormControl('',[Validators.required]),
    existenciaarticulo : new FormControl('',[Validators.required]),
    codigoarticulo : new FormControl("",[Validators.required]),
    costoarticulo : new FormControl("",[Validators.required]),
  })

  onInsert() 
	{ 
		if(!this.articuloForm.valid){alert("Error: Formulario Invalido"); return;}
		this.articuloForm.value.idarticulo = this.idarticulo[this.indiceSeleccionado]
		this.api.update("articulo","update",  this.articuloForm.value).subscribe(res =>{
			
			console.log(res);
			
		})
		console.log(this.articuloForm.value)
	}


  constructor(private api:APIService)
    {	
      let params =
      {
        limit:50
      }
  
      this.api.select("articulo", "dropdown",params).subscribe({next: res=>{
  
  
        for(let i of Object.values(res))
          {
            this.articulos.push(i.descripcionarticulo)
            this.idarticulo.push(i.idarticulo)
            console.log(this.articulos)
          }
      }})
  
    }
    

}
