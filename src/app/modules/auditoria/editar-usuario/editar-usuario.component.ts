import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {
  idcargos: any[] = []
  cargos : any[] = [];

  idusuarios: any[] = []
  usuarios : any[] = [];

  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
  
  opcionSeleccionada: any
  indiceSeleccionado: any

  opcionSeleccionada2: any
  indiceSeleccionado2: any

  articuloForm =  new FormGroup({
    nombreusuario : new FormControl(),
    cargousuario : new FormControl(),
    contrasenausuario: new FormControl(),
    idusuario : new FormControl(),
    correousuario : new FormControl(),
    cedulausuario : new FormControl(),
    telefonousuario : new FormControl(),
  })

  
  
  onInsert() 
  { 
    this.articuloForm.value.cargousuario = this.idcargos[this.indiceSeleccionado]
    this.articuloForm.value.idusuario = this.idusuarios[this.indiceSeleccionado2]
    this.api.update("usuario","update",  this.articuloForm.value).subscribe(res =>{
      
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

    this.api.select("usuario", "list",params).subscribe({next: res=>{


      for(let i of Object.values(res))
        {
          this.usuarios.push(i.nombreusuario)
          this.idusuarios.push(i.idusuario)
          console.log(this.usuarios)
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

  public getDropdown2()
  {
    if (this.opcionSeleccionada2) {
      this.indiceSeleccionado2 = this.usuarios.indexOf(this.opcionSeleccionada2);
      console.log(this.idusuarios[this.indiceSeleccionado2])
      } else {
      this.indiceSeleccionado2 = null;
      }
  }

}
