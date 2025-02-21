import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-generar-factura',
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule ],
  templateUrl: './generar-factura.component.html',
  styleUrl: './generar-factura.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerarFacturaComponent {

}
