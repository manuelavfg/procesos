import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agg-proveedor',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agg-proveedor.component.html',
  styleUrl: './agg-proveedor.component.scss'
})
export class AggProveedorComponent {
  constructor(private api: APIService){}

    articuloForm =  new FormGroup({
      nombreproveedores : new FormControl('',[Validators.required]),
      correoproveedores: new FormControl('',[Validators.required,Validators.email]),
      rifproveedores: new FormControl('',[Validators.required]),
      direccionproveedores : new FormControl('',[Validators.required]),
      telefonoproveedores : new FormControl('',[Validators.required]),
    })


    onInsert()
    {
      if(!this.articuloForm.valid){alert("Error: Formulario Invalido"); return;}

      this.api.insert("proveedores","add",  this.articuloForm.value).subscribe(res =>{
        
        console.log(res);
        
      })
      console.log(this.articuloForm.value)
    } 


}
