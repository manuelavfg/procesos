import { ChangeDetectionStrategy, Component, NgModule, Output, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { APIService } from '../../../services/api.service';
import moment from 'moment';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';


export interface ArticuloRecibo {
    idarticulo:any
	descripcionarticulo: any,  
	tipoarticulo: any,
	cantidadrecibo: any,
	costoarticulo: any,
    entradaarticulo:any,
    escompra:any,
    esexento:any
}

@Component({
  selector: 'app-salida',
  imports: [MatFormFieldModule, MatIconModule, MatIconModule, MatCheckboxModule, MatDividerModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MomentDateModule, MatDatepickerModule, MatTableModule],
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
      'cantidadrecibo',
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
        idarticulofactura : new FormControl(''),
        idfactura: new FormControl(''),
        esexento:new FormControl(''),
        entradaarticulo: new FormControl('',[Validators.required]),
        cantidadrecibo: new FormControl('',[Validators.required,Validators.pattern(/^(0|[1-9]\d*)$/)]),
        idproveedor : new FormControl(''),
        idproveedorfactura : new FormControl(''),
        
      })

      constructor(private api:APIService, private router: Router)
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

      existeArticulo(id:any)
      {
          return this.dataSource.data.some(
              item => item.idarticulo === id
            );
      }

      @ViewChild(MatTable) tabla!: MatTable<ArticuloRecibo>;

      agregarDato() 
      {
        if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}
        let i = {idarticulo: this.idproducto[this.indiceSeleccionado2]}
        let j = {idfactura: this.idfactura[this.indiceSeleccionado]}
        let fechaValue = this.articuloForm.value.entradaarticulo;
        let fecha: Date = fechaValue ? new Date(fechaValue) : new Date();
        let fechaformateada = moment(fecha).format('DD-MM-YYYY')        
        if(this.existeArticulo(this.idproducto[this.indiceSeleccionado2])){this.api.mostrarError("Item Repetido"); return;}


        this.api.select("articulo","factura", i).subscribe(res => 
        {
          let p:any
              for(let value of Object.values(res))
          {
              p = 
              {
                descripcionarticulo: value.descripcionarticulo,
                tipoarticulo: value.tipoarticulo,
                costoarticulo: value.costoarticulo,
                cantidadrecibo: this.articuloForm.value.cantidadrecibo,
                entradaarticulo: fechaformateada,
                idfactura: j.idfactura,
                idarticulo: i.idarticulo,
                escompra: +false,
                esexento: +(this.articuloForm.value.esexento ?? false)
              }
          }
          const datosActualizados = [...this.dataSource.data, p];
          this.dataSource.data = datosActualizados


        });
      }

      onInsert() 
      { 
        if(this.dataSource.data.length == 0){this.api.mostrarError("Error: Factura Vacia");return}
        let p = 
        {
        
          idcliente: this.proveedores[this.indiceSeleccionado],
          idfactura: this.idfactura[this.indiceSeleccionado]
          
        }
        this.articuloForm.value.idarticulo = this.idproducto[this.indiceSeleccionado2]    
        for(let i of this.dataSource.data)
          {
            this.api.insert("recibo","add", i).subscribe(res =>{
            })
          }
          this.api.insert("cuentasporcobrar", "add",p).subscribe(res=>
          {

          })
          this.api.update("factura","update", {idfactura: this.idfactura[this.indiceSeleccionado], isregistrado: 1}).subscribe(res=>
          {

          })
          this.api.mostrarExito("Operacion Exitosa")
          this.router.navigate(['/facturas']) 
      }
      
  
    public getDropdown()
    {
      if (this.opcionSeleccionada) {
        this.indiceSeleccionado = this.facturas.indexOf(this.opcionSeleccionada);
        } else {
        this.indiceSeleccionado = null;
        }
    }
    public getDropdown2()
    {
      if (this.opcionSeleccionada2) {
        this.indiceSeleccionado2 = this.productos.indexOf(this.opcionSeleccionada2);
        } else {
        this.indiceSeleccionado2 = null;
        }
    }

    @Output() mensajeEnviado = new EventEmitter<any>();

    enviaMensaje()
    {
        const x = this.dataSource.data || "chorizo"
        this.mensajeEnviado.emit(x)
    }

    @Output() datosDestinatario = new EventEmitter<any>


    avanzar() {
        let a = this.dataSource
        this.datosDestinatario.emit(a); // Emite el evento
    }

    @Output() retrocederStepper = new EventEmitter<void>(); // Evento para avanzar

    retroceder() {
      this.retrocederStepper.emit(); // Emite el evento

    }

    isChecked: boolean = false;
  
    // Si necesitas manejar el cambio de estado
    onCheckboxChange(event: MatCheckboxChange) {
    }
  }

