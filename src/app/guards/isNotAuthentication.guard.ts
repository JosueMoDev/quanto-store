import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

export const IsNotAuthenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  const authenticationService = inject(AuthenticationService);
  if (!authenticationService.getCurrentUserLogged()) {
    return true;
  } else {
    route.navigateByUrl('/home/products')
    return false;
  }
};
