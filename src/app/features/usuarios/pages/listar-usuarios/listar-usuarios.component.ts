import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../shared/models/usuario.model';
import { Router, RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../../../shared/enums/enum';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'acciones', 'activo'];
  dataSource = new MatTableDataSource<Usuario>([]);
  private snackBar = inject(MatSnackBar);

  Rol = Rol;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        alert('Error al cargar los usuarios');
      }
    });
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  asignarRol(id: string) {
    this.router.navigate(['/usuarios', id, 'asignar-rol']);
  }

  deshabilitarUsuario(id: string) {
  if (!confirm('¿Estás seguro de que deseas deshabilitar este usuario?')) return;

  this.usuarioService.deshabilitar(id).subscribe({
    next: () => {
      alert('Usuario deshabilitado correctamente');
      this.cargarUsuarios();
    },
    error: () => {
      alert('Error al deshabilitar el usuario');
    }
  });
  
}

habilitarUsuario(id: string) {
  const confirmar = confirm('¿Estás seguro que deseas habilitar este usuario?');
  if (!confirmar) return;

  this.usuarioService.habilitar(id).subscribe({
    next: () => {
      this.cargarUsuarios();
      this.snackBar.open('Usuario habilitado correctamente', 'Cerrar', { duration: 3000 });
    },
    error: () => {
      this.snackBar.open('Error al habilitar usuario', 'Cerrar', { duration: 3000 });
    }
  });
}



}
