import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth-services.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta PLATFORM_ID
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data['requiredRole'];
    console.log('Required Role:', requiredRole); // Inspeccionar el rol requerido

    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isAuthenticated) => {
        console.log('Is Authenticated:', isAuthenticated); // Inspeccionar autenticación

        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return false;
        }

        // Verifica si es el navegador antes de acceder a localStorage
        if (isPlatformBrowser(this.platformId)) {
          const userRole = this.authService.getRole();
          console.log('User Role:', userRole); // Inspeccionar el rol del usuario

          if (requiredRole && userRole !== requiredRole) {
            this.router.navigate(['/']);
            return false;
          }
        } else {
          // Si no es el navegador, redirige o maneja el caso
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}