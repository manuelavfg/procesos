import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { APIService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [ MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit, OnDestroy {
  dropdownOpen = false;
  mostrarAuditoria: boolean = false;
  private subscription!: Subscription;

  constructor(private api: APIService, public router: Router){}

  ngOnInit() {

      if (typeof window !== 'undefined') {
        console.log('we are running on the client')
        if (typeof localStorage !== 'undefined') { // Verificación adicional
          this.mostrarAuditoria = localStorage.getItem('hideElement') === 'true';
        }
      }
      this.subscription = this.api.hideElement$.subscribe((value: boolean) => {
      this.mostrarAuditoria = value;
        });
  }

  ngOnDestroy() {
    if(this.subscription !== undefined)
    {
      this.subscription.unsubscribe();
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  imgsrc = '../../../assets/img/snoopy.jpg';

}
