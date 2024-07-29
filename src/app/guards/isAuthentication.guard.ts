import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const IsAuthenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  const currentUserLogged = sessionStorage.getItem('currentUserLogged');
  if (currentUserLogged) {
    return true;
  } else {
    route.navigateByUrl('/authentication/login')
    return false;
  }
};
