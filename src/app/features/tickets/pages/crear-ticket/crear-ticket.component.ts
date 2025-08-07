import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../../../shared/services/ticket.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../../shared/models/usuario.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateTicketDto } from '../../../../shared/models/ticket.model';

@Component({
  selector: 'app-crear-ticket',
  standalone: true,
  templateUrl: './crear-ticket.component.html',
  styleUrl: './crear-ticket.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    
  ],
})
export class CrearTicketComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private usuarioService = inject(UsuarioService);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);


  public form: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    usuarioAsignadoId: ['', Validators.required]
  });

  readonly usuarios = signal<Usuario[]>([]);

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe({
      next: (res) => this.usuarios.set(res),
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.snackBar.open('Error al cargar usuarios ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }

  crearTicket() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const usuarioCreadorId = usuarioLogueado?.id;

  if (!usuarioCreadorId) {
    this.snackBar.open('Error: no se encontró usuario logueado', 'Cerrar', { duration: 3000 });
    return;
  }

  const dto: CreateTicketDto = {
  titulo: this.form.value.titulo!,
  descripcion: this.form.value.descripcion!,
  usuarioAsignadoId: this.form.value.usuarioAsignadoId!,
  usuarioCreadorId: usuarioLogueado.id,
  estado: 0 // Estado inicial
};

  this.ticketService.create(dto).subscribe({
    
    next: () => {
      console.log('DTO enviado al backend:', dto);
      this.snackBar.open('Ticket creado correctamente ✅', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/tickets']);
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Error al crear el ticket ❌', 'Cerrar', { duration: 3000 });
    }
  });
}

}
