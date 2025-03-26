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
    busqueda = new FormControl("")
    nombres:any[] = []
    ids:any[] = []
    idseleccionada:any
    filteroption:any
    
    tiporeporte:any

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: APIService) 
    {
        
        this.api.select(data.tabla,data.metodo,data.params).subscribe({
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

    Print()
       { 
        switch(this.data.tabla){
            case 'factura':
                if(this.filteroption == true)
                {
                    this.reporte.printFactura(this.idseleccionada)
                }
                this.reporte.printFactura(this.idseleccionada)
                break
            case 'clientes':
                this.reporte.printListadoC(this.data.tabla)
                break
            case 'proveedores':
                this.reporte.printListadoP(this.data.tabla)
                break

            case 'articulo':
                if(this.tiporeporte == this.data.options[0])
                {
                    this.reporte.printListadoA(this.data.tabla)
                    return;
                }
                if(this.tiporeporte == this.data.options[1])
                {
                    this.reporte.printListadoDetalladoA(this.data.tabla, 'compra', {idarticulo: this.idseleccionada})
                    return;
                }
                if(this.tiporeporte == this.data.options[2])
                {
                    this.reporte.printListadoDetalladoA(this.data.tabla, 'ventas', {idarticulo:this.idseleccionada})
                    return;
                }
                break

            case 'usuario':
                this.reporte.printListadoU(this.data.tabla)
                break

        }
    }

    onSelectionChange(event: MatSelectChange) {
        const selectedValue = event.value;
        this.tiporeporte = selectedValue
        if(selectedValue !== this.data.options[0])
        {
            this.filteroption = true
        }
        else{this.filteroption = false}

        }

        filtradoActivo: 'sin' | 'con' = 'sin'
        selectedTipoFiltro = 'fecha';
        fechaInicio = new FormControl(moment());
        fechaFin = new FormControl(moment());
      
        opciones = [
          { value: '1', viewValue: 'Opción 1' },
          { value: '2', viewValue: 'Opción 2' },
          { value: '3', viewValue: 'Opción 3' }
        ];
      
        actualizarControles() {
          // Lógica adicional si es necesaria al cambiar el tipo de filtro
        }
      }
