import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importante
import { FormsModule } from '@angular/forms';     // <--- Importante
import { Router } from '@angular/router';
import { Peluqueria } from '../../services/peluqueria';

@Component({
  selector: 'app-login',
  standalone: true, // <--- Esto indica que es moderno
  imports: [CommonModule, FormsModule], // <--- Importamos módulos aquí
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  usuario = { username: '', password: '' };
  mensajeError = '';

  constructor(private peluService: Peluqueria, private router: Router) {}

  ingresar() {
    this.peluService.login(this.usuario).subscribe({
      next: (res) => {
        if (res.status === 1) {
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.mensajeError = res.msg;
        }
      },
      error: () => this.mensajeError = 'Error de conexión'
    });
  }
}