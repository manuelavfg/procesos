import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [ MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLinkWithHref],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {

}
