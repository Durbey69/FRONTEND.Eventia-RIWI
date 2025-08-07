// src/app/features/auth/pages/login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const correo = this.form.value.correo!;
    this.usuarioService.buscarPorCorreo(correo).subscribe({
      next: (usuario) => {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        this.snackBar.open(`Bienvenido, ${usuario.nombre}`, 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tickets']);
      },
      error: () => {
        this.snackBar.open('Usuario no encontrado ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
