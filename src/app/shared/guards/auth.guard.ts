import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuario = localStorage.getItem('usuarioLogueado');

  if (usuario) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
