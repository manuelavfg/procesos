import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../../../api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-generar-factura',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule,
    MomentDateModule, MatDatepickerModule, CommonModule, MatOption, MatRadioModule],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerarFacturaComponent {

  proveedores : any[] = [];
  idproveedores:any[]=[]
  clientes : any[] = [];
  hidden = true
  idclientes:any[]=[]

  tipos = ['COTIZACION', 'PROFORMA']
  currentOptions: any[] = [];
  
  opcionSeleccionada: any;
  indiceSeleccionado: any
  opcionSeleccionada2: any;
  indiceSeleccionado2: any

  articuloForm =  new FormGroup({
	selectedType: new FormControl('1'),
    codigofactura : new FormControl('1234'),
	numerofactura : new FormControl('1234'),
    fechaemision: new FormControl(''),
    idproveedorfactura : new FormControl(''),
	idcliente: new FormControl(''),
    tipofactura : new FormControl(''),
    idarticulofactura : new FormControl(),
  })

  

	constructor(private api:APIService, private router: Router)
	{	
		let params =
		{
			limit:50
		}

		this.api.select("proveedores", "dropdown",params).subscribe({next: res=>{
			for(let i of Object.values(res))
				{
					this.proveedores.push(i.nombreproveedores)
					this.idproveedores.push(i.idproveedores)
					console.log(this.idproveedores)
				}
		}})

		this.api.select("clientes", "dropdown",params).subscribe({next: res=>{
			for(let i of Object.values(res))
				{
					this.clientes.push(i.nombreclientes)
					this.idclientes.push(i.idclientes)
					console.log(this.idclientes)
				}
		}})

	}

	ngOnInit(): void {
		this.loadInitialData();
		
		// Escuchar cambios en el radio button
		this.articuloForm.get('selectedType')?.valueChanges.subscribe(value => {
		  this.updateDropdownOptions(value || '1');
		  this.articuloForm.get('idproveedorfactura')?.reset(); // Reiniciar selección
		});
	  }

	  loadInitialData(): void {
		this.updateDropdownOptions('1');
	  }

	onInsert() 
	{ 
		if(!this.articuloForm.valid){this.api.mostrarError("Error: Formulario Invalido"); return;}

		if(Number(this.articuloForm.value.selectedType) == 2)
		{
			this.articuloForm.value.idproveedorfactura = this.idproveedores[this.indiceSeleccionado]
			if(this.indiceSeleccionado2 == 1){this.articuloForm.value.tipofactura = "COTIZACION"}
			else{
				{this.articuloForm.value.tipofactura = "PROFORMA"
				}
				
				this.api.insert("factura","add",  this.articuloForm.value).subscribe(res =>{
					
					console.log(res);
					
				})
			}
		}
		if(Number(this.articuloForm.value.selectedType) === 1){
			
			this.articuloForm.value.idproveedorfactura = this.idproveedores[this.indiceSeleccionado]

			if(this.indiceSeleccionado2 == 1){this.articuloForm.value.tipofactura = "COTIZACION"}
			else{
				{this.articuloForm.value.tipofactura = "PROFORMA"
				}
				
				this.api.insert("factura","add2",  this.articuloForm.value).subscribe(res =>{
					
					console.log(res);
					
				})
                this.api.mostrarExito("Operacion Exitosa")
                this.router.navigate(['/facturas']) 
			}
		console.log(this.articuloForm.value)
	}}

	public getDropdown() {
		if (this.opcionSeleccionada) {
		  // Determinar qué array usar según el radio button seleccionado
		  const currentArray = this.articuloForm.get('selectedType')?.value === '1' 
							  ? this.clientes 
							  : this.proveedores;
	  
		  // Buscar el índice en el array correspondiente
		  this.indiceSeleccionado = currentArray.indexOf(this.opcionSeleccionada);
		  console.log('Índice seleccionado:', this.idproveedores[this.indiceSeleccionado]);
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

	updateDropdownOptions(type: string): void {
		this.currentOptions = type === '1' ? this.clientes : this.proveedores;
	  }

}
