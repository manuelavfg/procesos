import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { APIService } from '../../../api.service';


import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-registrar-entrada',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatDatepickerModule, MatTableModule],
  templateUrl: './registrar-entrada.component.html',
  styleUrl: './registrar-entrada.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarEntradaComponent {

    facturas : any[] = [];
    productos: any[]=[]
	  displayedColumns: string[] = ['descripcionarticulo', 'tipoarticulo', 'existenciaarticulo', 'codigoarticulo', 'costoarticulo'];
    
    opcionSeleccionada: any
    opcionSeleccionada2: any
    indiceSeleccionado: any
    indiceSeleccionado2: any

    articuloForm =  new FormGroup({
      idarticulo : new FormControl(''),
      idarticulofactura : new FormControl(''),
      idfactura: new FormControl(''),
      cantidadrecibo: new FormControl(''),
      idproveedor : new FormControl(''),
      idproveedorfactura : new FormControl(''),
      
    })
      constructor(private api:APIService)
      {	
        let params =
        {
          limit:50
        }
    
        this.api.select("factura", "dropdown",params).subscribe({next: res=>{
    
    
          for(let i of Object.values(res))
            {
              this.facturas.push(i.codigofactura)
              console.log(this.facturas)
            }
    
    
        }})

        this.api.select("articulo", "dropdown",params).subscribe({next: res=>{
    
    
          for(let i of Object.values(res))
            {
              this.productos.push(i.descripcionarticulo)
              console.log(this.productos)
            }
    
    
        }})
    
      }




      onInsert() 
      { 
        this.articuloForm.value.idproveedor = this.indiceSeleccionado
        this.articuloForm.value.idarticulo = this.indiceSeleccionado2

        this.api.update("articulo","update",this.articuloForm.value)

      }
      
  
    public getDropdown()
    {
      if (this.opcionSeleccionada) {
        this.indiceSeleccionado = this.facturas.indexOf(this.opcionSeleccionada)+1;
        console.log(this.indiceSeleccionado)
        } else {
        this.indiceSeleccionado = null;
        }
    }
    public getDropdown2()
    {
      if (this.opcionSeleccionada) {
        this.indiceSeleccionado2 = this.productos.indexOf(this.opcionSeleccionada2)+1;
        console.log(this.indiceSeleccionado2)
        } else {
        this.indiceSeleccionado2 = null;
        }
    }
}
