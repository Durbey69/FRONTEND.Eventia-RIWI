import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../../shared/services/ticket.service';
import { Ticket } from '../../../../shared/models/ticket.model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EstadoTicket } from '../../../../shared/models/estado-ticket.model';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listar-tickets',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  templateUrl: './listar-tickets.component.html',
  styleUrl: './listar-tickets.component.scss'
})
export class ListarTicketsComponent {
  
  private ticketService = inject(TicketService);
  private router = inject(Router);

  readonly tickets = signal<Ticket[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly EstadoTicket = EstadoTicket;

  snackBar = inject(MatSnackBar);

  columnas: string[] = ['titulo', 'estado', 'asignado', 'acciones'];
  

  constructor() {
    this.cargarTickets();
  }

  irAUsuarios() {
  this.router.navigate(['/usuarios']);
}

usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
esAgente = this.usuarioLogueado?.rol === 2;



  cargarTickets() {
    this.ticketService.getAll().subscribe({
      next: (res) => {
        this.tickets.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al obtener tickets');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  irACrearTicket() {
    this.router.navigate(['/tickets/crear']);
  }

  verTicket(id: string) {
    this.router.navigate(['/tickets', id]);
  }

  editarTicket(id: string) {
    this.router.navigate(['/tickets/editar', id]);
  }

  eliminarTicket(id: string) {
  if (confirm('¿Estás seguro de eliminar este ticket?')) {
    this.ticketService.eliminar(id).subscribe({
      next: () => {
        this.snackBar.open('Ticket eliminado correctamente ✅', 'Cerrar', { duration: 3000 });
        this.cargarTickets(); 
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al eliminar el ticket ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
}

}
