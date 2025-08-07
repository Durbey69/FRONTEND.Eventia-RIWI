export interface Ticket {
  id: string;
  titulo: string;
  descripcion: string;
  estado: number;
  fechaCreacion: string;
  fechaCierre?: string | null;
  usuarioCreadorId: string;
  usuarioAsignadoId: string;
  nombreUsuarioCreador?: string;
  nombreUsuarioAsignado?: string;
}


export interface CreateTicketDto {
  titulo: string;
  descripcion: string;
  usuarioAsignadoId: string;
  usuarioCreadorId: string;
  estado: number;
}


export interface UpdateTicketDto {
  id: string;
  titulo: string;
  descripcion: string;
  estado: number;
  usuarioAsignadoId: string;
  fechaCierre?: Date;
  usuarioCreadorId: string;
}


