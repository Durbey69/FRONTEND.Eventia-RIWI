export interface TicketEvento {
  id: string;
  ticketId: string;
  tipoEvento: string;
  mensaje: string;
  fecha: string;
  usuarioResponsableId: string;
  nombreUsuarioResponsable?: string;
}
