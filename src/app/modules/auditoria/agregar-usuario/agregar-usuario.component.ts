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
  selector: 'app-agregar-usuario',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.scss'
})
export class AgregarUsuarioComponent {
  idcargos: any[] = []
  cargos : any[] = [];
  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
  
  opcionSeleccionada: any
  indiceSeleccionado: any
  articuloForm =  new FormGroup({
    nombreusuario : new FormControl('',[Validators.required]),
    cargousuario : new FormControl('',[Validators.required]),
    contrasenausuario: new FormControl('',[Validators.required]),
    correousuario : new FormControl('',[Validators.required,Validators.email]),
    cedulausuario : new FormControl('',[Validators.required]),
    telefonousuario : new FormControl('',[Validators.required]),
  })

  
  
  onInsert() 
  { 
    if(!this.articuloForm.valid){alert("Error: Formulario Invalido"); return;}
    this.articuloForm.value.cargousuario = this.idcargos[this.indiceSeleccionado]
    this.api.insert("usuario","add",  this.articuloForm.value).subscribe(res =>{
      
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

    this.api.select("permiso", "list",params).subscribe({next: res=>{


      for(let i of Object.values(res))
        {
          this.cargos.push(i.cargopermiso)
          this.idcargos.push(i.idpermiso)
          console.log(this.cargos)
        }


    }})

  }

  public getDropdown()
  {
    if (this.opcionSeleccionada) {
      this.indiceSeleccionado = this.cargos.indexOf(this.opcionSeleccionada);
      console.log(this.idcargos[this.indiceSeleccionado])
      } else {
      this.indiceSeleccionado = null;
      }
  }

}
