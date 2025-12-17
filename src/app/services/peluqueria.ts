import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Peluqueria {
  // Asegúrate de que esta URL sea la correcta de tu worker
  private apiUrl = 'https://backend-peluqueria.kevincrzz-14-05.workers.dev/api';

  constructor(private http: HttpClient) { }

  login(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }

  guardarTrabajo(trabajo: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/trabajos`, trabajo, { headers });
  }

  obtenerEstadisticas(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.apiUrl}/estadisticas`, { headers }).pipe(
      timeout(8000), // Subí un poco el timeout por si Mongo tarda en calcular
      catchError(error => {
        console.warn('Error en stats:', error);
        return throwError(() => new Error('Error al conectar con el servidor'));
      })
    );
  }
}