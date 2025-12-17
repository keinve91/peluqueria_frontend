import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Stats } from './components/stats/stats';
import { Login } from './components/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Home },   // Pantalla de registro rápido
    { path: 'estadisticas', component: Stats } // Pantalla de números
];