import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rol } from '../../../shared/enums/enum';
import { CreateUsuarioDto } from '../../../shared/models/usuario.model';
import { UsuarioService } from '../../../shared/services/usuario.service';


@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class CrearUsuarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  public router = inject(Router);

  readonly form = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    rol: [null, Validators.required]
  });

  Rol = Rol;
  roles: number[] = Object.values(Rol).filter(v => typeof v === 'number') as number[];

  ngOnInit(): void {}

  crear() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: CreateUsuarioDto = {
      nombre: this.form.value.nombre!,
      correo: this.form.value.correo!,
      rol: Number(this.form.value.rol),
      activo: true
    };

    this.usuarioService.create(dto).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado correctamente ✅', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear el usuario ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
