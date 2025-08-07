import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketEvento } from '../models/ticket-evento.model';

@Injectable({ providedIn: 'root' })
export class TicketEventoService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5059/api/TicketEventos';

  getByTicketId(ticketId: string): Observable<TicketEvento[]> {
    return this.http.get<TicketEvento[]>(`${this.apiUrl}/ticket/${ticketId}`);
  }
}
