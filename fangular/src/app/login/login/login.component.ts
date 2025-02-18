import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private http: HttpClient,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.http.post('http://localhost:3005/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          document.cookie = `authToken=${response.token}; path=/;`;
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
  }
}
