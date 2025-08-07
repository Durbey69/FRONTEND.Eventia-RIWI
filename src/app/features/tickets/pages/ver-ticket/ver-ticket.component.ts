import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TicketService } from '../../../../shared/services/ticket.service';

import { Ticket } from '../../../../shared/models/ticket.model';
import { TicketEvento } from '../../../../shared/models/ticket-evento.model';
import { TicketEventoService } from '../../../../shared/services/ticket-evento.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-ticket',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './ver-ticket.component.html',
  styleUrl: './ver-ticket.component.scss'
})
export class VerTicketComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  private eventoService = inject(TicketEventoService);

  readonly ticket = signal<Ticket | null>(null);
  readonly eventos = signal<TicketEvento[]>([]);
  readonly loading = signal(true);

  columnas = ['fecha', 'tipoEvento', 'usuario', 'mensaje'];

  dataSource = new MatTableDataSource<TicketEvento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  snackBar = inject(MatSnackBar);



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketService.getById(id).subscribe({
        next: (ticket) => {
          this.ticket.set(ticket);
          this.loading.set(false);
        },
        error: () => {
          this.snackBar.open('Error al cargar ticket', 'Cerrar');
          this.router.navigate(['/tickets']);
        }
      });

      this.eventoService.getByTicketId(id).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<TicketEvento>(data);
          this.dataSource.paginator = this.paginator;
        },
        error: () => this.snackBar.open('Error al cargar eventos', 'Cerrar')
      });
    }
  }
}
