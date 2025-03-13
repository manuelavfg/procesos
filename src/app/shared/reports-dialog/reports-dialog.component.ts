import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReporteService } from '../../reporte.service';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  imports:  [MatDialogModule,MatIconModule, MatIconModule, MatSelectModule ,
            MatInputModule, MatAutocompleteModule, MatFormFieldModule ,ReactiveFormsModule,
             CommonModule , MatButtonModule]
})
export class ReportsDialogComponent {
    reporte = inject(ReporteService)

    filteredOptions: any;
    busqueda: any
    label: any
    opcion1:any

    constructor() {this.opcion1 = new FormControl("")
    }
    onOptionSelected(){}

    Print(){ this.reporte.printFactura()}
}
