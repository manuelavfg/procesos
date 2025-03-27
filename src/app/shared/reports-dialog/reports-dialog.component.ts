import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ReporteService } from '../../services/reporte.service';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { APIService } from '../../services/api.service';
import moment from 'moment';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { Console } from 'console';



@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  imports:  [MatDialogModule,MatIconModule, FormsModule, MatIconModule, MatSelectModule ,
            MatInputModule, MatAutocompleteModule, MatFormFieldModule ,ReactiveFormsModule,
             CommonModule , MatRadioModule, MatDatepickerModule, MomentDateModule, MatButtonModule, CommonModule]
})
export class ReportsDialogComponent {
    reporte = inject(ReporteService)

    filteredOptions: any;
    filteredOptions2: any;
    busqueda = new FormControl("")
    busqueda2 = new FormControl("")
    nombres:any[] = []
    nombres2:any[] = []
    ids:any[] = []
    ids2:any[] = []
    idseleccionada:any
    parametro:any
    titulo:any
    filteroption:any

    valores:any
    
    tiporeporte:any


    obtenerParametro(valorSeleccionado: MatSelectChange) {

        console.log('Valor seleccionado:', valorSeleccionado);
        const indice = this.data.valores.indexOf(valorSeleccionado);
        console.log('Índice seleccionado:', indice);
        console.log(this.parametro)
        switch(this.data.tabla)
        {
            case 'articulo':
                if(indice == 0){this.parametro = "id"; this.titulo = "Articulo"}

                else if(indice == 1){this.parametro = "proveedor"; this.titulo = "Proveedor"}
                else if(indice == 2){this.parametro = "unidades"; this.titulo = "Unidades"}
                else if(indice == 3){this.parametro = "fecha"; this.titulo = "Fecha De Entrada"; console.log(this.parametro)}
                else if(indice == 4){this.parametro = "fecha2"; this.titulo = "Fecha De Salida"}
                break;
            case 'proveedores':
                    if(indice == 0){this.parametro = "id"; this.titulo = "Proveedor"; console.log(this.parametro)}
                    else if(indice == 1){this.parametro = "articulo"; this.titulo = "Articulo"; console.log(this.parametro)}
                    else if(indice == 2){this.parametro = "fecha"; this.titulo = "Fecha de Compra"; console.log(this.parametro)}
                    break;
            case 'clientes':
                        if(indice == 0){this.parametro = "id"; this.titulo = "Cliente"; console.log(this.parametro)}
                        else if(indice == 1){this.parametro = "articulo"; this.titulo = "Articulo"; console.log(this.parametro)}
                        else if(indice == 2){this.parametro = "fecha"; this.titulo = "Fecha de Venta"; console.log(this.parametro)}
                        break;

        }

    }

    ngOnInit() {
        this.filteredOptions = this.busqueda.valueChanges.pipe(
          startWith(''),
          map((value:any) => this._filter(value || '')),
        );
      }


    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
    
        return this.nombres.filter((option:any) => option.toLowerCase().includes(filterValue));
    }

    private _filter2(value: string): string[] {
        const filterValue = value.toLowerCase();
    
        return this.nombres2.filter((option:any) => option.toLowerCase().includes(filterValue));
    }


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: APIService) 
    {
        this.valores = data.valores
        this.api.select(data.tabla, data.metodo, data.params).subscribe({
            next: (res) => {
                for (let i of Object.values(res)) 
                {
                    this.nombres.push(i[data.busqueda])
                    this.ids.push(i["id"+this.data.tabla])
                    this.filteredOptions = this.busqueda.valueChanges.pipe(
                        startWith(''),
                        map((value:any) => this._filter(value || '')),
                      );
                }
            }
        })

        this.api.select(data.tabla2, data.metodo2, data.params).subscribe({
            next: (res) => {
                for (let i of Object.values(res)) 
                {
                    this.nombres2.push(i[data.busqueda2])
                    this.ids2.push(i["id"+this.data.tabla2])
                    this.filteredOptions2 = this.busqueda2.valueChanges.pipe(
                        startWith(''),
                        map((value:any) => this._filter2(value || '')),
                      );
                }
            }
        })

    }

    onOptionSelected(event: MatAutocompleteSelectedEvent) {
            // Obtener el valor seleccionado
            const selectedValue = event.option.value;
        
            // Obtener el índice de la opción seleccionada
            const selectedIndex = this.ids[(this.nombres.indexOf(selectedValue))];

            this.idseleccionada = selectedIndex
        
            console.log('Valor seleccionado:', selectedValue);
            console.log('Índice seleccionado:', selectedIndex);
    }

    onOptionSelected2(event: MatAutocompleteSelectedEvent) {
        // Obtener el valor seleccionado
        const selectedValue = event.option.value;
    
        // Obtener el índice de la opción seleccionada
        const selectedIndex = this.ids2[(this.nombres2.indexOf(selectedValue))];

        this.idseleccionada = selectedIndex
    
        console.log('Valor seleccionado:', selectedValue);
        console.log('Índice seleccionado:', selectedIndex);
}


    Print()
       { 
        switch(this.data.tabla){
            case 'articulo':
                if(this.tiporeporte == this.data.options[0])
                {

                    this.reporte.printListadoA(this.data.tabla)
                    return;
                }
                if(this.tiporeporte == this.data.options[1])
                {
                    let params = {}
                    console.log(this.busqueda)

                    if(this.filtradoActivo == 'sin'){ params = {inicio: 0, fin: 0, idarticulo:0, filtrado: 'todo'}}
                    else{params = {inicio: this.fechaInicio.value, fin: this.fechaFin.value, idarticulo: this.idseleccionada, filtrado: this.parametro}; console.log(params)}
                    this.reporte.printListadoDetalladoA(this.data.tabla, 'compra', params, this.tiporeporte, this.titulo, this.data.busqueda, this.data.busqueda2)
                    return;
                }
                if(this.tiporeporte == this.data.options[2])
                {
                    let params = {}
                    if(this.filtradoActivo == 'sin'){ params = {inicio: 0, fin: 0, idarticulo:0, filtrado: 'todo'}}
                    else{params = {inicio: this.fechaInicio.value, fin: this.fechaFin.value, idarticulo: this.idseleccionada, filtrado: this.parametro}; console.log(params)}
                    this.reporte.printListadoDetalladoA(this.data.tabla, 'ventas', params, this.tiporeporte, this.titulo, this.data.busqueda, this.data.busqueda2)
                    return;
                }
                break

            case 'proveedores':
                if(this.tiporeporte == this.data.options[0])
                    {
                        this.reporte.printListadoP(this.data.tabla)
                        return;
                    }
                if(this.tiporeporte == this.data.options[1])
                     {
                            let params = {}
        
                            if(this.filtradoActivo == 'sin'){ params = {inicio: 0, fin: 0, idarticulo:0, filtrado: 'todo'}}
                            else{params = {inicio: this.fechaInicio.value, fin: this.fechaFin.value, id: this.idseleccionada, filtrado: this.parametro}; console.log(params)}
                            this.reporte.printListadoDetalladoA(this.data.tabla, 'compra', params, this.tiporeporte, this.titulo, this.data.busqueda, this.data.busqueda2)
                            return;
                    }
                break
            case 'clientes':
                    if(this.tiporeporte == this.data.options[0])
                        {
                            this.reporte.printListadoC(this.data.tabla)
                            return;
                        }
                    if(this.tiporeporte == this.data.options[1])
                         {
                                let params = {}
            
                                if(this.filtradoActivo == 'sin'){ params = {inicio: 0, fin: 0, idarticulo:0, filtrado: 'todo'}}
                                else{params = {inicio: this.fechaInicio.value, fin: this.fechaFin.value, id: this.idseleccionada, filtrado: this.parametro}; console.log(params)}
                                this.reporte.printListadoDetalladoA(this.data.tabla, 'venta', params, this.tiporeporte, this.titulo, this.data.busqueda, this.data.busqueda2)
                                return;
                        }
                    break
            case 'factura':
                if(this.tiporeporte == this.data.options[0])
                    {
                        this.reporte.printListadoF(this.data.tabla)
                        return;
                    }
        }
    }

    onSelectionChange(event: MatSelectChange) {
        const selectedValue = event.value;

        this.tiporeporte = selectedValue

        console.log('Valor seleccionado:', selectedValue);
        if(selectedValue !== this.data.options[0])
        {
            this.filteroption = true
        }
        else{this.filteroption = false}

        }

        filtradoActivo: 'sin' | 'con' = 'sin'
        selectedTipoFiltro = '';
        fechaInicio = new FormControl();
        fechaFin = new FormControl();
        
      
      
        actualizarControles() {
          // Lógica adicional si es necesaria al cambiar el tipo de filtro
        }
      }
