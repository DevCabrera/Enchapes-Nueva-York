import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3005/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<number | null>(this.getRole());

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log('Respuesta del login:', response); // Verificar la respuesta
        if (isPlatformBrowser(this.platformId) && response.token) {
          localStorage.setItem('authToken', response.token); // Almacena el token solo en el navegador
          this.authStatus.next(true);
          this.userRole.next(this.getRoleFromToken(response.token));
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true }).pipe(
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('authToken'); // Elimina el token solo en el navegador
        }
        this.authStatus.next(false);
        this.userRole.next(null);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getRole(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      console.log('Token obtenido del localStorage:', token); // Verificar el token
      return token ? this.getRoleFromToken(token) : null;
    }
    return null;
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  private getRoleFromToken(token: string): number | null {
    console.log('Token recibido:', token);
    if (!token) {
      console.error('Token no proporcionado');
      return null;
    }

    try {
      // Dividir el token en sus tres partes
      const payloadBase64Url = token.split('.')[1];
      if (!payloadBase64Url) {
        console.error('Token malformado: no contiene payload');
        return null;
      }

      // Convertir Base64Url a Base64 estándar
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');

      // Decodificar el payload desde Base64
      const payloadJson = atob(payloadBase64);
      console.log('Payload JSON:', payloadJson); // Verificar el JSON decodificado

      // Parsear el JSON
      const payload = JSON.parse(payloadJson);
      console.log('Payload del token:', payload); // Inspeccionar el payload

      // Verificar que el campo id_tipo_usuario esté presente
      if (!payload.id_tipo_usuario) {
        console.error('Campo id_tipo_usuario no encontrado en el payload');
        return null;
      }

      return payload.id_tipo_usuario;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }
}