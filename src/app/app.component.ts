import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './features/layout/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CommonModule],
  template: `
    <app-header *ngIf="estaLogueado()"></app-header>
    <router-outlet />
  `
})
export class AppComponent {
  readonly estaLogueado = computed(() => !!localStorage.getItem('usuarioLogueado'));
}
