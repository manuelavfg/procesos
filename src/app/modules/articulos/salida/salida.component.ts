import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { APIService } from '../../../api.service';
import moment from 'moment';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-salida',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MomentDateModule, MatDatepickerModule, MatTableModule],
  templateUrl: './salida.component.html',
  styleUrl: './salida.component.scss'
})
export class SalidaComponent {

    facturas : any[] = [];
    idfactura: any[] = [];

    proveedores: any[]=[]
    idproveedores: any[]=[]

    productos: any[]=[]
    idproducto: any[]= []


    columnas: string[] = [
      'descripcionarticulo',
      'tipoarticulo',
      'existenciaarticulo',
      'costoarticulo',
      'entradaarticulo',
    ];
    dataSource = new MatTableDataSource<ArticuloRecibo>();

    opcionSeleccionada: any
    opcionSeleccionada2: any
    indiceSeleccionado: any
    indiceSeleccionado2: any

    articuloForm =  new FormGroup({
      idarticulo : new FormControl('',[Validators.required]),
      idarticulofactura : new FormControl('',[Validators.required]),
      idfactura: new FormControl('',[Validators.required]),
      fechaentrada: new FormControl('',[Validators.required]),
      cantidadrecibo: new FormControl('',[Validators.required]),
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

            }
    
    
        }})
        
        this.api.select("factura", "dropdown2",params).subscribe({next: res=>{
    
    
          for(let i of Object.values(res))
            {
              this.facturas.push(i.nombreclientes+" Factura: "+i.numerofactura)
              this.idfactura.push(i.idfactura)
              this.proveedores.push(i.idcliente)
            }
        }})

      }


      @ViewChild(MatTable) tabla!: MatTable<ArticuloRecibo>;

      agregarDato() 
      {
        let i = {idarticulo: this.idproducto[this.indiceSeleccionado2]}
        let j = {idfactura: this.idfactura[this.indiceSeleccionado]}
        let fecha:Date = new Date(this.articuloForm.value.fechaentrada as string)
        let fechaformateada = moment(fecha).format('DD-MM-YYYY')        

        this.api.select("articulo","factura", i).subscribe(res => 
        {
          if(!this.articuloForm.valid){alert("Error: Formulario Invalido"); return;}
          let p:any
          for(let value of Object.values(res))
          {
              p = 
              {
                descripcionarticulo: value.descripcionarticulo,
                tipoarticulo: value.tipoarticulo,
                costoarticulo: value.costoarticulo,
                existenciaarticulo: this.articuloForm.value.cantidadrecibo,
                fechaentrada: fechaformateada,
                idfactura: j.idfactura,
                idarticulo: i.idarticulo,
              }
          }
          const datosActualizados = [...this.dataSource.data, p];
          this.dataSource.data = datosActualizados
          console.log(this.dataSource.data)

        });
      }

      onInsert() 
      { 
        if(this.dataSource.data.length == 0){alert("Error: Factura Vacia");return}
        let p = 
        {
          
          codigocuentascobrar: "CNT-00"+this.idfactura[this.indiceSeleccionado],
          idcliente: this.proveedores[this.indiceSeleccionado],
          idfactura: this.idfactura[this.indiceSeleccionado]
          
        }
        
        for(let i of this.dataSource.data)
          {
            this.api.insert("recibo","add", i).subscribe(res =>{
              console.log(res)
            })
          }
          this.api.insert("cuentasporcobrar", "add",p).subscribe(res=>
          {
              console.log(res)
          })
          this.api.update("factura","update", {idfactura: this.idfactura[this.indiceSeleccionado], isregistrado: 1}).subscribe(res=>
          {
                console.log(res)
          })
          
      }
      
  
    public getDropdown()
    {
      if (this.opcionSeleccionada) {
        this.indiceSeleccionado = this.facturas.indexOf(this.opcionSeleccionada);
        console.log(this.indiceSeleccionado)
        console.log(this.proveedores[this.indiceSeleccionado])
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
