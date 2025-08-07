import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignarRolDto, CreateUsuarioDto, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5059/api/usuarios';

  buscarPorCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/BuscarPorCorreo`, {
      params: { correo }
    });
  }

  getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  asignarRol(dto: AsignarRolDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${dto.usuarioId}/rol`, dto);
  }

  deshabilitar(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/disable`, {});
  }

  habilitar(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/enable`, {});
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  update(usuario: Usuario) {
  return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario);
}



  create(dto: CreateUsuarioDto): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, dto);
  }
}
