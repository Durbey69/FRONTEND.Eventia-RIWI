import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTicketDto, Ticket, UpdateTicketDto } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5059/api/Tickets';

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  create(ticket: CreateTicketDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ticket);
  }

  eliminar(id: string): Observable<any> {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado')!);
  const url = `${this.apiUrl}/${id}?usuarioResponsableId=${usuario.id}`;
  return this.http.delete(url);
}

update(dto: UpdateTicketDto): Observable<any> {
  return this.http.put(`${this.apiUrl}/${dto.id}`, dto);
}




}
