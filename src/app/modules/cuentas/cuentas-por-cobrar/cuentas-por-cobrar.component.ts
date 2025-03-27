import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { APIService } from '../../../services/api.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cuentas-por-cobrar',
    imports: [ MatTableModule, MatMenuModule, MatPaginatorModule, MatSelectModule, MatChipsModule  ,MatButtonModule, MatOptionModule, FormsModule , MatIconModule, CommonModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrl: './cuentas-por-cobrar.component.scss'
})
export class CuentasPorCobrarComponent implements AfterViewInit {
  displayedColumns: string[] = ['codigocuentascobrar', 'nombreclientes' , 'numerofactura', 'total_pagado'];
    dataSource = new MatTableDataSource<any>();
  
    limit = 50;
    offset = 0;
  
// Opciones del menú
    opcionesEstado = [
        { valor: '1', texto: 'Pagada' },
        { valor: '0', texto: 'Pendiente' },
    ];

    esadmin = true;

    // Obtener texto para mostrar en el chip
    getTextoEstado(valor: string): string {
        return this.opcionesEstado.find(e => e.valor === valor)?.texto || valor;
    }

    // Actualizar estado
    actualizarEstado(elemento: any, nuevoEstado: string) {
        elemento.estado = nuevoEstado;
        this.guardarEstado(elemento); // Llama a tu servicio
    }

    guardarEstado(elemento: any) {
        // Aquí tu lógica para actualizar el estado
        console.log('Nuevo estado:', elemento.estado);
        console.log('Datos completos:', elemento);
        
        // Ejemplo de llamada a servicio:
        // this.cuentaService.actualizarEstado(elemento.id, elemento.estado)
        //   .subscribe(res => { ... });
    }


    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private api: APIService)
    {	
        
    }    
  

    private subscription!: Subscription;
    
    ngOnDestroy() {
        if(this.subscription !== undefined)
        {
          this.subscription.unsubscribe();
        }
      }

    ngAfterViewInit() {

        if (typeof window !== 'undefined') {
            console.log('we are running on the client')
            if (typeof localStorage !== 'undefined') { // Verificación adicional
              this.esadmin = localStorage.getItem('hideElement') === 'true';
            }
          }
            this.subscription = this.api.hideElement$.subscribe((value: boolean) => {
            this.esadmin = value;
            });

      let p:any
      let params= 
      {
        limit : this.limit,
        offset : this.offset,
      }
  
  
      this.api.select("cuentasporcobrar","list", params).subscribe(res =>
      {
        p = res;
        this.dataSource = new MatTableDataSource(p)
        this.dataSource.paginator = this.paginator;
      })
    }

    searchTerm: string = '';
    
      // Carga datos desde la API
      loadData() {
        let p = {searchTerm: this.searchTerm}
        this.api.select("cuentasporcobrar","search",p).subscribe(res=>{
            let a:any = res
            this.dataSource.data = a
			this.dataSource.paginator = this.paginator;

        })

      }
    
      // Aplica el filtro (llama a la API)
      applyFilter() {
        console.log(this.searchTerm)
        this.loadData(); // Recarga datos con el término de búsqueda
      }


}

export interface Cobrar {
  nombreclientes: any;
  codigocuentascobrar: any;
  total_pagado: any;
  numerofactura: any;
  estado: any;
}

