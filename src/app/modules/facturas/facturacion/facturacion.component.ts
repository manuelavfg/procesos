import { Component, ViewChild, viewChildren, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GenerarFacturaComponent } from "../generar-factura/generar-factura.component";
import { RegistrarEntradaComponent } from "../registrar-entrada/registrar-entrada.component";
import { SalidaComponent } from '../salida/salida.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../../services/api.service';
import { Router } from '@angular/router';
import moment from 'moment';



export interface ArticuloRecibo {
    idarticulo:any
	descripcionarticulo: any,  
	tipoarticulo: any,
	cantidadrecibo: any,
	costoarticulo: any,
    entradaarticulo:any,
    esexento:any,
    escompra:any
}


@Component({
  selector: 'app-facturacion',

  imports: [
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    GenerarFacturaComponent,
    RegistrarEntradaComponent,
    SalidaComponent
], 
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.scss'
})
export class FacturacionComponent 
{

    constructor(private api: APIService, public router: Router){}

    esproveedor:any = "1"
    data: any
    dataDestinatario: any = {}
    dataTabla:any




    generarSalida()
    {
        let a:any
        let b:any
        if(this.dataTabla.data.length == 0){this.api.mostrarError("Error: Factura Vacia");return}

        console.log(a)

        this.api.insert("factura","add2",this.dataDestinatario).subscribe({next:(res)=>{
            a = res
            

            for(let i of this.dataTabla.data)
            {
                let j = 
                {
                    cantidadrecibo: i.cantidadrecibo,
                    costoarticulo: i.costoarticulo,
                    idarticulo: i.idarticulo,
                    idfactura: a,
                    escompra: i.escompra,
                    esexento: i.esexento
                }
                this.api.insert("recibo","add", j).subscribe()
                i.entradaarticulo = moment(i.entradaarticulo, 'DD-MM-YYYY').format('YYYY-MM-DD')
                this.api.update('articulo',"salida", i).subscribe()
            }





            b = {idcliente: this.dataDestinatario.id, idfacturarecibo:a}
            this.api.insert("cuentasporcobrar", "add",b).subscribe()
        }})
        this.api.mostrarExito("Operacion Exitosa")
        this.router.navigate(['/facturas']) 


    }

    generarEntrada()
    {

        let a:any
        let b:any
        if(this.dataTabla.data.length == 0){this.api.mostrarError("Error: Factura Vacia");return}

        console.log(a)

        this.api.insert("factura","add",this.dataDestinatario).subscribe({next:(res)=>{
            a = res
            

            for(let i of this.dataTabla.data)
            {
                let j = 
                {
                    cantidadrecibo: i.cantidadrecibo,
                    costoarticulo: i.costoarticulo,
                    idarticulo: i.idarticulo,
                    idfactura: a,
                    escompra: i.escompra,
                    esexento: i.esexento
                }
                i.entradaarticulo
                this.api.insert("recibo","add", j).subscribe()
                i.entradaarticulo = moment(i.entradaarticulo, 'DD-MM-YYYY').format('YYYY-MM-DD')
                this.api.update('articulo',"registrar", i).subscribe()
            }





            b = {idproveedor: this.dataDestinatario.id, idfactura:a}
            this.api.insert("cuentasporpagar", "add",b).subscribe()
        }})
        this.api.mostrarExito("Operacion Exitosa")
        this.router.navigate(['/facturas']) 


    }






    recibirMensaje(mensaje: any)
    {
        this.esproveedor = mensaje
        console.log("Mensaje recibido:", this.esproveedor);
    }

    recibirData(mensaje: any)
    {
        this.data = mensaje
        console.log("Mensaje recibido:", this.data);
    }

    @ViewChild('stepper') stepper!: MatStepper; // Tipo correcto

    avanzarGenerar(a: any) {
        this.stepper.next();
        let mensaje = a[0]
        
        
        // Verificar si es proveedor o cliente
        if (mensaje?.nombreproveedores) { 
            let fecha = a[1]
            let tipo = a[2]
            let numero = a[3]
            this.dataDestinatario = {
                id: mensaje.idproveedores,
                nombre: mensaje.nombreproveedores,
                telefono: mensaje.telefonoproveedores || 'No especificado',
                rif: mensaje.rifproveedores,
                direccion: mensaje.direccionproveedores,
                fecha: fecha,
                tipo: tipo,
                numero: numero
            };
            console.log(this.dataDestinatario)
        }
        
        else
        {
            let mensaje = a[0]
            let tipo = a[1]
            this.dataDestinatario = {
                id: mensaje.idclientes,
                nombre: mensaje.nombreclientes,
                telefono: mensaje.telefonoclientes || 'No especificado',
                rif: mensaje.rifclientes,
                direccion: mensaje.direccionclientes,
                fecha: moment.now(),
                tipo: tipo
            };
            console.log(this.dataDestinatario)

        }
    }

    avanzarTabla(mensaje:any) {
        
        this.stepper.next();
        this.dataTabla = mensaje
        console.log(this.dataTabla);
    }

    retroceder() {
        this.stepper.previous();
        console.log("Stepper retrocedido");
    }


    displayedColumns: string[] = ['articulo','tipo', 'cantidad', 'precio', 'total'];
  

  
    fechaEmision: Date = new Date();
    tipoFactura: string = 'Factura de Crédito';
  
    goBack() {
      this.stepper.previous()
      console.log('Botón retroceder clickeado');
    }
  
    confirmar() {
        console.log(this.esproveedor)
        if(this.esproveedor==1){this.generarSalida()}
        else{this.generarEntrada()}
    }
}

