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
  isAuthenticated: boolean = false;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}
