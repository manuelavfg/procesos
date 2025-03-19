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
  selector: 'app-editar-prodcuto',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule,MatAutocompleteModule ,MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-prodcuto.component.html',
  styleUrl: './editar-prodcuto.component.scss'
})
export class EditarProdcutoComponent {

  idarticulo: any[] = []
  articulos : any[] = [];
  
  id:any
  datos : any
  producto = new FormControl('')
  filteredOptions: any;


  articuloForm =  new FormGroup({
      idarticulo : new FormControl(''),
      descripcionarticulo : new FormControl('',[Validators.required]),
      tipoarticulo: new FormControl('',[Validators.required]),
    //   existenciaarticulo : new FormControl('',[Validators.required,Validators.pattern(/^(0|[1-9]\d*)$/)]),
    //   codigoarticulo : new FormControl('',[Validators.required]),
      costoarticulo : new FormControl('',[Validators.required,Validators.pattern(/^\d+([.,]\d{1,2})?$/)]),
  })


  ngOnInit() {
    this.filteredOptions = this.producto.valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.articulos.filter((option:any) => option.toLowerCase().includes(filterValue));
  }


  onInsert() 
	{ 
		if(!this.articuloForm.valid){this.api.mostrarError("Formulario Invalido"); return;}
		this.articuloForm.value.idarticulo = this.id
		this.api.update("articulo","update",  this.articuloForm.value).subscribe(res =>{
			
			console.log(res);
            this.api.mostrarExito("Operacion Exitosa")
            this.router.navigate(['/articulos']) 
		})
	}

    onOptionSelected(event: MatAutocompleteSelectedEvent) {
        // Obtener el valor seleccionado
        const selectedValue = event.option.value;
    
        // Obtener el índice de la opción seleccionada
        const selectedIndex = this.datos[(this.articulos.indexOf(selectedValue))]['idarticulo'];
    
        this.id = selectedIndex
        console.log('Valor seleccionado:', selectedValue);
        console.log('Índice seleccionado:', selectedIndex);
    
        const articuloseleccionado =this.datos[this.articulos.indexOf(selectedValue)];
    
        this.articuloForm.patchValue({
          descripcionarticulo: articuloseleccionado.descripcionarticulo,
          tipoarticulo: articuloseleccionado.tipoarticulo,
          costoarticulo: articuloseleccionado.costoarticulo,
        });
    }



  constructor(private api:APIService, private router: Router)
    {	
      let params =
      {
        limit:50,
        offset:0
      }
  
      this.api.select("articulo", "list",params).subscribe({next: res=>{
        
        this.datos = res
        for(let i of Object.values(res))
          {
            this.articulos.push(i.descripcionarticulo)
            console.log(this.articulos)
            
            this.filteredOptions = this.producto.valueChanges.pipe(
                startWith(''),
                map((value:any) => this._filter(value || '')),
              );
          }
      }})
  
    }
    

}
