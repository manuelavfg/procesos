import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.scss'
})
export class AgregarUsuarioComponent {
  idcargos: any[] = []
  cargos : any[] = [];
  prefijos = ['V-','E-']
  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
  
  
  opcionSeleccionada: any
  indiceSeleccionado: any
  articuloForm =  new FormGroup({
    nombreusuario : new FormControl('',[Validators.required, Validators.minLength(2), 
        Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),

    cargousuario : new FormControl('',[Validators.required]),

    contrasenausuario: new FormControl('',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),

    correousuario : new FormControl('',[Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),

    cedulausuario : new FormControl('',
        [Validators.required, 
        Validators.pattern('^\\d+$'),
        Validators.maxLength(8),Validators.minLength(8)]),

    telefonousuario : new FormControl('',[Validators.required,
        Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
          
    prefijo: new FormControl('',[Validators.required])
  })

  
  
  onInsert() 
  { 
    if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
    this.articuloForm.value.cargousuario = this.idcargos[this.indiceSeleccionado]
    this.api.insert("usuario","add",  this.articuloForm.value).subscribe(res =>{
      
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
          console.log(res)
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
