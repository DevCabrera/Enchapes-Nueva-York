import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login/login.component';
import { AuthService } from '../../Services/auth-services.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;  //de por si estara en false, para que se active el boton de login

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = this.getCookie('authToken');
    this.isAuthenticated = !!token;
    console.log('token:', token);
  }

  getCookie(name: string): string | null {
    if (typeof document !== 'undefined') {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checkAuthStatus();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        document.cookie = 'authToken=; Max-Age=0; path=/;';
        this.isAuthenticated = false;
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}
