import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Peluqueria } from '../../services/peluqueria';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stats.html',
  styleUrls: ['./stats.css']
})
export class Stats implements OnInit {
  // Estructura inicial segura
  stats: any = {
    dia: { totalPlata: 0, cantidadTotal: 0, cantidadCortes: 0, cantidadVarios: 0 },
    semana: { totalPlata: 0, cantidadTotal: 0 },
    mes: { totalPlata: 0, cantidadTotal: 0 }
  };
  
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private peluService: Peluqueria,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.error = false;
    
    this.peluService.obtenerEstadisticas().subscribe({
      next: (res) => {
        console.log('Stats recibidas:', res);
        this.stats = res;
        this.cargando = false;
        this.cd.detectChanges(); // Forza la actualización de la vista
      },
      error: (e) => {
        console.error(e);
        this.cargando = false;
        this.error = true;
        this.cd.detectChanges();
      }
    });
  }
}