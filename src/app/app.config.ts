import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

export const MY_MOMENT_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato para parsear la entrada
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato mostrado en el input
    monthYearLabel: 'MMMM YYYY', // Formato del mes y año en el selector
    dateA11yLabel: 'LL', // Para accesibilidad
    monthYearA11yLabel: 'MMMM YYYY', // Para accesibilidad
  },
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideClientHydration(withEventReplay()), 
     provideAnimationsAsync(), provideHttpClient(withFetch()),
     { provide: DateAdapter, useClass: MomentDateAdapter}, // Usa MomentDateAdapter
     { provide: MAT_DATE_FORMATS, useValue: MY_MOMENT_FORMATS }, // Proporciona el forma
  ]
};
