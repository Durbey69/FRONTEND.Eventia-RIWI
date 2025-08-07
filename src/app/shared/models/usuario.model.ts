export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: number;
}


export interface AsignarRolDto {
  usuarioId: string;
  rol: number;
}


export interface CreateUsuarioDto {
  nombre: string;
  correo: string;
  rol: number;
  activo: boolean;
}
