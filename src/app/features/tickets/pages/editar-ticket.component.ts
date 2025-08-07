import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Usuario } from '../../../shared/models/usuario.model';
import { TicketService } from '../../../shared/services/ticket.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UpdateTicketDto } from '../../../shared/models/ticket.model';

@Component({
  selector: 'app-editar-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './editar-ticket.component.html',
  styleUrl: './editar-ticket.component.scss'
})
export class EditarTicketComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    id: [''],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estado: [0, Validators.required],
    usuarioAsignadoId: ['', Validators.required],
    fechaCierre: [''],
    usuarioCreadorId: ['']
  });

  usuarios = signal<Usuario[]>([]);
  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketService.getById(id).subscribe({
        next: (ticket) => {
          this.form.patchValue(ticket);
          this.loading.set(false);
        },
        error: () => {
          this.snackBar.open('Error al cargar el ticket', 'Cerrar');
          this.router.navigate(['/tickets']);
        }
      });

      this.usuarioService.getAll().subscribe({
        next: (data) => this.usuarios.set(data),
        error: () => this.snackBar.open('Error al cargar usuarios', 'Cerrar')
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const dto: UpdateTicketDto = this.form.value; 

    this.ticketService.update(dto).subscribe({
      next: () => {
        this.snackBar.open('Ticket actualizado con éxito', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/tickets']);
      },
      error: () => {
        this.snackBar.open('Error al actualizar el ticket', 'Cerrar');
      }
    });
  }
}
