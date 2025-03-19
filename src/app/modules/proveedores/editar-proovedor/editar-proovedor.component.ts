import { Component, OnInit, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-editar-proovedor',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatAutocompleteModule ,MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-proovedor.component.html',
  styleUrl: './editar-proovedor.component.scss'
})
export class EditarProovedorComponent {

  nombres : any[] = [];
  
  id:any
  datos : any
  proveedor = new FormControl('')
  filteredOptions: any;

  opcionSeleccionada: any
  indiceSeleccionado: any

  articuloForm =  new FormGroup({
    idproveedores: new FormControl(''),
    nombreproveedores : new FormControl('',[Validators.required, Validators.minLength(2), 
        Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),
      correoproveedores: new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),
      rifproveedores: new FormControl('',[Validators.required,Validators.pattern(/^[JVEPGC]-\d{8,9}-\d$/)]),
      direccionproveedores : new FormControl('',[Validators.required]),
      telefonoproveedores : new FormControl('',[Validators.required,Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
  })




  ngOnInit() {
    this.filteredOptions = this.proveedor.valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nombres.filter((option:any) => option.toLowerCase().includes(filterValue));
  }








  constructor(private api: APIService, private router: Router)
  {

    let params =
    {
      limit:50
    }

    this.api.select("proveedores", "list",params).subscribe({next: res=>{

        this.datos = res
      for(let i of Object.values(res))
        {
          this.nombres.push(i.nombreproveedores)
          console.log(this.nombres)
        }
        this.filteredOptions = this.proveedor.valueChanges.pipe(
            startWith(''),
            map((value:any) => this._filter(value || '')),
          );

    }})

  }
  
  onInsert()
  {
    if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
  this.articuloForm.value.idproveedores = this.id

    this.api.update("proveedores", "update", this.articuloForm.value).subscribe({next: res=>
      {

        console.log(res)
        this.api.mostrarExito("Operacion Exitosa")
        this.router.navigate(['/proveedores']) 
      }})
      console.log(this.articuloForm.value)

  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    // Obtener el valor seleccionado
    const selectedValue = event.option.value;

    // Obtener el índice de la opción seleccionada
    const selectedIndex = this.datos[(this.nombres.indexOf(selectedValue))]['idproveedores'];

    this.id = selectedIndex
    console.log('Valor seleccionado:', selectedValue);
    console.log('Índice seleccionado:', selectedIndex);

    const proveedoreseleccionado =this.datos[this.nombres.indexOf(selectedValue)];

    this.articuloForm.patchValue({
      nombreproveedores: proveedoreseleccionado.nombreproveedores,
      correoproveedores: proveedoreseleccionado.correoproveedores,
      telefonoproveedores: proveedoreseleccionado.telefonoproveedores,
      rifproveedores:proveedoreseleccionado.rifproveedores,
      direccionproveedores:proveedoreseleccionado.direccionproveedores,
    });
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
