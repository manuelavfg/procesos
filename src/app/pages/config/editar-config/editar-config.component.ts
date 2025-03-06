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
  selector: 'app-editar-config',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-config.component.html',
  styleUrl: './editar-config.component.scss'
})
export class EditarConfigComponent {
  articuloForm =  new FormGroup({
    nombreconfig : new FormControl('',[Validators.required]),
    tasaconfig : new FormControl('',[Validators.required]),
    rifconfig: new FormControl('',[Validators.required]),
    correoconfig : new FormControl('',[Validators.required,Validators.email]),
    ivaconfig : new FormControl('',[Validators.required]),
    telefonoconfig : new FormControl('',[Validators.required]),
    crltvfactura : new FormControl(),
    crltvpresupuesto : new FormControl(),
  })

  constructor(private api: APIService)
  {
  }

  onInsert()
  {
    if(!this.articuloForm.valid){alert("Error: Formulario Invalido"); return;}
    this.api.update("config","update", this.articuloForm.value).subscribe(res =>
  {
      console.log(res)
  })
  }

}
