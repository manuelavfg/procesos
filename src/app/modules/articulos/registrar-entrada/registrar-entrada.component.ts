import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { APIService } from '../../../api.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MomentDateModule } from '@angular/material-moment-adapter';

export interface ArticuloRecibo {
	descripcionarticulo: any,  
	tipoarticulo: any,
	existenciaarticulo: any,
	costoarticulo: any,
}


@Component({
  selector: 'app-registrar-entrada',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MomentDateModule, MatDatepickerModule, MatTableModule],
  templateUrl: './registrar-entrada.component.html',
  styleUrl: './registrar-entrada.component.scss',
})
export class RegistrarEntradaComponent {

    facturas : any[] = [];

    productos: any[]=[]
    idproducto: any[]= []

    columnas: string[] = [
      'descripcionarticulo',
      'tipoarticulo',
      'existenciaarticulo',
      'costoarticulo',
    ];
    dataSource = new MatTableDataSource<ArticuloRecibo>();

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
  
        this.api.select("articulo", "dropdown",params).subscribe({next: res=>{
    
    
          for(let i of Object.values(res))
            {
              this.productos.push(i.descripcionarticulo)
              this.idproducto.push(i.idarticulo)
              console.log(this.productos)
              console.log(this.idproducto)
            }
    
    
        }})
    
      }


      @ViewChild(MatTable) tabla!: MatTable<ArticuloRecibo>;

      agregarDato() 
      {
        let i = {idarticulo: this.idproducto[this.indiceSeleccionado2]}
        this.api.select("articulo","factura", i).subscribe(res => 
        {
          console.log("RESPUESTA DE LA API: " + res)
          let p:any
		    for(let value of Object.values(res))
          {
              p = 
              {
                descripcionarticulo: value.descripcionarticulo,
                tipoarticulo: value.tipoarticulo,
                codigoarticulo: value.codigoarticulo,
                costoarticulo: value.costoarticulo,
                existenciaarticulo: this.articuloForm.value.cantidadrecibo,
              }
          }
          const datosActualizados = [...this.dataSource.data, p];
          console.log(datosActualizados)
          this.dataSource.data = datosActualizados

        });
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
      if (this.opcionSeleccionada2) {
        this.indiceSeleccionado2 = this.productos.indexOf(this.opcionSeleccionada2);
        console.log(this.indiceSeleccionado2)
        } else {
        this.indiceSeleccionado2 = null;
        }
    }
}
