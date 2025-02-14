import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proveedores',
  imports: [ MatIconModule, MatButtonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent  {
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;

  cards = [
    { icon: 'person', title: 'Tecnologías avanzadas', description: 'Activo' },
    { icon: 'person', title: 'Distribuidora el Sol', description: 'Inactivo' },
    { icon: 'person', title: 'Ferretería los Andes', description: 'Activo' },
    { icon: 'person', title: 'Tecnologías avanzadas', description: 'Inactivo' },
    { icon: 'person', title: 'Distribuidora el Sol', description: 'Activo' }
  ];

  scrollAmount = 300; // Ajusta la cantidad de desplazamiento

  prevSlide() {
    if (this.carouselWrapper) {
      this.carouselWrapper.nativeElement.scrollLeft -= this.scrollAmount;
    }
  }

  nextSlide() {
    if (this.carouselWrapper) {
      this.carouselWrapper.nativeElement.scrollLeft += this.scrollAmount;
    }
  }
}
