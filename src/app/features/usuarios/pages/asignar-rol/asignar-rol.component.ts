import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { AsignarRolDto, Usuario } from '../../../../shared/models/usuario.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Rol } from '../../../../shared/enums/enum';

@Component({
  selector: 'app-asignar-rol',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './asignar-rol.component.html',
  styleUrl: './asignar-rol.component.scss'
})
export class AsignarRolComponent {
  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  public router = inject(Router);
  private fb = inject(FormBuilder);

  rolesDisponibles: number[] = Object.values(Rol).filter(
    v => typeof v === 'number'
  ) as number[];
  readonly usuario = signal<Usuario | null>(null);
  Rol = Rol;

  form = this.fb.group({
    rol: [null as number | null, Validators.required]
  });


  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  this.usuarioService.getById(id).subscribe({
    next: (usuario) => {
      this.usuario.set(usuario);

      // Asigna el rol actual al form
      this.form.patchValue({
        rol: usuario.rol
      });
    },
    error: () => {
      this.snackBar.open('Error al cargar el usuario', 'Cerrar');
      this.router.navigate(['/usuarios']);
    }
  });
}


  guardar() {
  if (this.form.invalid || !this.usuario()) return;

  const dto: AsignarRolDto = {
    usuarioId: this.usuario()!.id,
    rol: Number(this.form.value.rol)
  };

  this.usuarioService.asignarRol(dto).subscribe({
    next: () => {
      this.snackBar.open('Rol asignado correctamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/usuarios']);
    },
    error: () => {
      this.snackBar.open('Error al asignar rol', 'Cerrar', { duration: 3000 });
    }
  });
}


}
