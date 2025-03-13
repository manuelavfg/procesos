import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GenerarFacturaComponent } from "../generar-factura/generar-factura.component";
import { RegistrarEntradaComponent } from "../registrar-entrada/registrar-entrada.component";


@Component({
  selector: 'app-facturacion',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    GenerarFacturaComponent,
    RegistrarEntradaComponent
],

  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.scss'
})
export class FacturacionComponent {

}
