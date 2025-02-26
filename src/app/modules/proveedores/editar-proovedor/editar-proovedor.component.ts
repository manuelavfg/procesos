import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { APIService } from '../../../api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-proovedor',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-proovedor.component.html',
  styleUrl: './editar-proovedor.component.scss'
})
export class EditarProovedorComponent {

  nombres : any[] = [];
  
  opcionSeleccionada: any
  indiceSeleccionado: any

  articuloForm =  new FormGroup({
    idproveedores: new FormControl(''),
    nombreproveedores: new FormControl(''),
    rifproveedores: new FormControl(''),
    telefonoproveedores: new FormControl(''),
    direccionproveedores: new FormControl(''),
    correoproveedores: new FormControl(''),
  })

  constructor(private api: APIService)
  {

    let params =
    {
      limit:50
    }

    this.api.select("proveedores", "dropdown",params).subscribe({next: res=>{


      for(let i of Object.values(res))
        {
          this.nombres.push(i.nombreproveedores)
          console.log(this.nombres)
        }


    }})

  }
  
  onInsert()
  {

  this.articuloForm.value.idproveedores = this.indiceSeleccionado

    this.api.update("proveedores", "update", this.articuloForm.value).subscribe({next: res=>
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
