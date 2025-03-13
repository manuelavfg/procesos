import { Component, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
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
  selector: 'app-editar-config',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-config.component.html',
  styleUrl: './editar-config.component.scss'
})
export class EditarConfigComponent {
  articuloForm =  new FormGroup({
    nombreconfig : new FormControl('',[Validators.required]),
    tasaconfig : new FormControl('',[Validators.required, Validators.pattern(/^(0|[1-9]\d*)([.,]\d{1,2})?$/)]),
    rifconfig: new FormControl('',[Validators.required,Validators.pattern(/^[JVEPGC]-\d{8,9}-\d$/)]),
    correoconfig : new FormControl('',[Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),

    direccionconfig: new FormControl("", [Validators.required,Validators.minLength(8)]),

    ivaconfig : new FormControl('',[Validators.required, Validators.pattern(/^(0|[1-9]\d*)([.,]\d{1,2})?$/)]),

    telefonoconfig : new FormControl('',[Validators.required,
        Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
  })

  constructor(private api: APIService, private router:Router)
  {
    let p;
    this.api.select('config','list',{limit:50}).subscribe({next:(res=>{

        let p: any
        p = res

        this.articuloForm.patchValue({
            nombreconfig: p[0]['nombreconfig'],
            rifconfig: p[0]['rifconfig'],
            tasaconfig: p[0]['tasaconfig'],
            correoconfig: p[0]['correoconfig'],
            ivaconfig: p[0]['ivaconfig'],
            telefonoconfig: p[0]['telefonoconfig'],
        })

    })})
    
  }

  onInsert()
  {
    if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
    this.api.update("config","update", this.articuloForm.value).subscribe(res =>
  {
      console.log(res)
      this.api.mostrarExito("Operacion Exitosa")
      this.router.navigate(['/configuracion']) 
  })
  }

}
