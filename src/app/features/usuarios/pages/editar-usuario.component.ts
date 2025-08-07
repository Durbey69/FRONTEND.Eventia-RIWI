import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../../../shared/models/usuario.model';
import { UsuarioService } from '../../../shared/services/usuario.service';


@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,

  ]
})
export class EditarUsuarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  private usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.usuarioService.getById(id).subscribe({
      next: (usuario) => this.form.patchValue(usuario),
      error: () => {
        this.snackBar.open('Error al cargar el usuario', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usuarioService.update(this.form.value as Usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuario actualizado correctamente ✅', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        this.snackBar.open('Error al actualizar el usuario ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
