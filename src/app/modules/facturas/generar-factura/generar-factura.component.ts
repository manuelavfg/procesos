import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../../../api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-generar-factura',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatOption, MatRadioModule],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerarFacturaComponent {

  proveedores : any[] = [];
  tipos = ['COTIZACION', 'PROFORMA']
  
  opcionSeleccionada: any;
  indiceSeleccionado: any
  opcionSeleccionada2: any;
  indiceSeleccionado2: any
  articuloForm =  new FormGroup({
    codigofactura : new FormControl(''),
    idproveedorfactura : new FormControl(''),
    idcliente: new FormControl(1),
    tipofactura : new FormControl(""),
    idarticulofactura : new FormControl(1),
  })

  

	constructor(private api:APIService)
	{	
		let params =
		{
			limit:50
		}

		this.api.select("proveedores", "dropdown",params).subscribe({next: res=>{


			for(let i of Object.values(res))
				{
					this.proveedores.push(i.nombreproveedores)
					console.log(this.proveedores)
				}


		}})

	}

	onInsert() 
	{ 
		this.articuloForm.value.idproveedorfactura = this.indiceSeleccionado
		if(this.indiceSeleccionado2 == 1){this.articuloForm.value.tipofactura = "COTIZACION"}
		else{
			{this.articuloForm.value.tipofactura = "PROFORMA"
		}

		this.api.insert("factura","add",  this.articuloForm.value).subscribe(res =>{
			
			console.log(res);
			
		})
		console.log(this.articuloForm.value)
	}}

	public getDropdown()
	{
		if (this.opcionSeleccionada) {
			this.indiceSeleccionado = this.proveedores.indexOf(this.opcionSeleccionada)+1;
			console.log(this.indiceSeleccionado)
		  } else {
			this.indiceSeleccionado = null;
		  }
	}
	public getDropdown2()
	{
		if (this.opcionSeleccionada2) {
			this.indiceSeleccionado2 = this.tipos.indexOf(this.opcionSeleccionada2)+1;
			console.log(this.indiceSeleccionado2,"QWEQWE")
		  } else {
			this.indiceSeleccionado2 = null;
		  }
	}


}
