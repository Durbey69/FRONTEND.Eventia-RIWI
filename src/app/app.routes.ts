import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './features/usuarios/pages/listar-usuarios/listar-usuarios.component';
import { ListarTicketsComponent } from './features/tickets/pages/listar-tickets/listar-tickets.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'tickets',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListarTicketsComponent },
      {
        path: 'crear',
        loadComponent: () =>
          import('./features/tickets/pages/crear-ticket/crear-ticket.component')
            .then(m => m.CrearTicketComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/tickets/pages/ver-ticket/ver-ticket.component')
            .then(m => m.VerTicketComponent)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./features/tickets/pages/editar-ticket.component')
            .then(m => m.EditarTicketComponent)
      }
    ]
  },

  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListarUsuariosComponent
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('./features/usuarios/pages/crear-usuario.component')
            .then(m => m.CrearUsuarioComponent)
      },
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./features/usuarios/pages/editar-usuario.component')
            .then(m => m.EditarUsuarioComponent)
      },
      {
        path: ':id/asignar-rol',
        loadComponent: () =>
          import('./features/usuarios/pages/asignar-rol/asignar-rol.component')
            .then(m => m.AsignarRolComponent)
      }
    ]
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.component')
        .then(m => m.LoginComponent)
  },

  { path: '**', redirectTo: '' }
];
