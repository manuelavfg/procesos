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
    idusuario : new FormControl('',[Validators.required]),
    nombreusuario : new FormControl('',[Validators.required, Validators.minLength(2), 
        Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),

    cargousuario : new FormControl('',[Validators.required]),

    contrasenausuario: new FormControl('',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),

    correousuario : new FormControl('',[Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
    ]),

    cedulausuario : new FormControl('',
        [Validators.required, 
        Validators.pattern('^\\d+$'),
        Validators.maxLength(8),Validators.minLength(8)]),

    telefonousuario : new FormControl('',[Validators.required,
        Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
  })

  
  
  onInsert() 
  {  
    if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
    this.articuloForm.value.cargousuario = this.idcargos[this.indiceSeleccionado]
    this.articuloForm.value.idusuario = this.idusuarios[this.indiceSeleccionado2]
    this.api.update("usuario","update",  this.articuloForm.value).subscribe(res =>{
      
      console.log(res);
      this.api.mostrarExito("Operacion Exitosa")
      this.router.navigate(['/auditoria']) 

    })
    console.log(this.articuloForm.value)
  }
  
  constructor(private api:APIService, private router: Router)
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
