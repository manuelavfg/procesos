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
  selector: 'app-editar-usuario',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {
  idcargos: any[] = []
  cargos : any[] = [];

  datos : any
  usuarios : any[] = [];

  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
  
  opcionSeleccionada: any
  indiceSeleccionado: any

  id:any

  filteredOptions: any;
  usuario = new FormControl('',[Validators.required]);

  
  articuloForm =  new FormGroup({
    idusuario : new FormControl(''),
    nombreusuario : new FormControl('',[Validators.required, Validators.minLength(2), 
        Validators.pattern(/^[A-Za-zÀ-ÿ\u00C0-\u017F\s'-]+$/)]),

    cargousuario : new FormControl('',[Validators.required]),

    contrasenausuario: new FormControl('',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),

    correousuario : new FormControl('',[Validators.required,Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
    ]),

    telefonousuario : new FormControl('',[Validators.required,
        Validators.pattern(/^(\+58[-\s.]?0?[24]\d{3}[-\s.]?\d{3}[-\s.]?\d{3}|0[24]\d{9})$/)]),
  })

  


  ngOnInit() {
    this.filteredOptions = this.usuario.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.usuarios.filter(option => option.toLowerCase().includes(filterValue));
  }












  
  onInsert() 
  {  
    if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
    this.articuloForm.value.idusuario = this.id
    this.articuloForm.value.cargousuario = this.idcargos[this.indiceSeleccionado]
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


        this.datos = res;

      for(let i of Object.values(res))
        {
          this.usuarios.push(i.nombreusuario)

          console.log(this.datos)
          this.filteredOptions = this.usuario.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
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

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    // Obtener el valor seleccionado
    const selectedValue = event.option.value;

    // Obtener el índice de la opción seleccionada
    const selectedIndex = this.datos[(this.usuarios.indexOf(selectedValue))]['idusuario'];
    this.id = selectedIndex
    console.log('Valor seleccionado:', selectedValue);
    console.log('Índice seleccionado:', selectedIndex);

    const usuarioSeleccionado = this.datos[this.usuarios.indexOf(selectedValue)];

    this.articuloForm.patchValue({
      nombreusuario: usuarioSeleccionado.nombreusuario,
      contrasenausuario: usuarioSeleccionado.contrasenausuario,
      correousuario: usuarioSeleccionado.correousuario,
      telefonousuario: usuarioSeleccionado.telefonousuario,
      cargousuario: usuarioSeleccionado.cargousuario
    });

  }

//   public getDropdown2()
//   {
//     if (this.opcionSeleccionada2) {
//       this.indiceSeleccionado2 = this.usuarios.indexOf(this.opcionSeleccionada2);
//       console.log(this.idusuarios[this.indiceSeleccionado2])
//       } else {
//       this.indiceSeleccionado2 = null;
//       }
//   }

}
