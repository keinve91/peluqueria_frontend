import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Peluqueria } from '../../services/peluqueria';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  precioVario: number | null = null;
  mensajeExito: string = ''; 

  constructor(private peluService: Peluqueria, private router: Router) {}

  registrarCorte() {
    this.procesarGuardado({ tipo: 'corte', precio: 5000 }, 'Corte Registrado');
  }

  registrarVario() {
    if (this.precioVario && this.precioVario > 0) {
      this.procesarGuardado({ tipo: 'varios', precio: this.precioVario }, `Vario $${this.precioVario} Registrado`);
    } else {
      alert('⚠️ Poné un precio');
    }
  }

  procesarGuardado(trabajo: any, mensaje: string) {
    // 1. FEEDBACK INSTANTÁNEO (No esperamos al servidor)
    this.mensajeExito = mensaje;
    this.precioVario = null; // Limpiamos input al toque

    // Quitamos el mensaje a los 2 segundos
    setTimeout(() => {
        this.mensajeExito = '';
    }, 2000);

    // 2. MANDAR A LA BASE DE DATOS "SILENCIOSAMENTE"
    // Nos suscribimos solo por si hay error grave, pero no bloqueamos nada.
    this.peluService.guardarTrabajo(trabajo).subscribe({
      next: (res) => console.log('Guardado OK en DB', res),
      error: (e) => console.error('Error de fondo (pero el usuario ya siguió):', e)
    });
  }

  salir() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}