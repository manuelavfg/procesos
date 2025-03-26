import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../services/api.service';
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
      nombreproveedores : new FormControl('',[Validators.required, Validators.minLength(2), 
        Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),
      correoproveedores: new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),
      rifproveedores: new FormControl('',[Validators.required,Validators.pattern(/^[JVEPGC]-\d{8,9}-\d$/)]),
      direccionproveedores : new FormControl('',[Validators.required]),
      telefonoproveedores : new FormControl('',[Validators.required,Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
    })


    onInsert()
    {
      if(!this.articuloForm.valid){this.api.mostrarError("Formulario Invalido"); return;}

      this.api.insert("proveedores","add",  this.articuloForm.value).subscribe(res =>{
        
        console.log(res);
        
      })
      console.log(this.articuloForm.value)
    } 


}
