import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { APIService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private api: APIService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (typeof window !== 'undefined') {
            console.log('You are on the browser')
            const user = localStorage.getItem('cuenta');
            if (user) {
                return true;
            }
            else {
                this.router.navigate(['/']);
                return false;
            }
          }
        
        return false;
    }
}