import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';
import { Router } from '@angular/router';

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
      idarticulo : new FormControl('',[Validators.required]),
      descripcionarticulo : new FormControl('',[Validators.required]),
      idproveedor : new FormControl('',[Validators.required]),
      tipoarticulo: new FormControl('',[Validators.required]),
      existenciaarticulo : new FormControl('',[Validators.required,Validators.pattern(/^(0|[1-9]\d*)$/)]),
      codigoarticulo : new FormControl('',[Validators.required]),
      costoarticulo : new FormControl('',[Validators.required,Validators.pattern(/^\d+([.,]\d{1,2})?$/)]),
  })

  onInsert() 
	{ 
		if(!this.articuloForm.valid){this.api.mostrarError("Formulario Invalido"); return;}
		this.articuloForm.value.idarticulo = this.idarticulo[this.indiceSeleccionado]
		this.api.update("articulo","update",  this.articuloForm.value).subscribe(res =>{
			
			console.log(res);
            this.api.mostrarExito("Operacion Exitosa")
            this.router.navigate(['/articulos']) 
		})
	}


  constructor(private api:APIService, private router: Router)
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
