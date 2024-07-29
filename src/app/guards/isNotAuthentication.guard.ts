import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const IsNotAuthenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  const currentUserLogged = sessionStorage.getItem('currentUserLogged');
  if (!currentUserLogged) {
    return true;
  } else {
    route.navigateByUrl('/home/products')
    return false;
  }
};
