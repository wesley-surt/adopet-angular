import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

export namespace AuthLoginGuard {

  export const canActivateAccount: CanActivateFn = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => {
      const authService: AuthenticationService = inject(AuthenticationService);
      const router = inject(Router);

      if(!authService.checkLogin()) {
        router.navigate(['home/login']);
        return false;
      };

      return true;
  }

  export const redirectForAccount: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    
      const authService: AuthenticationService = inject(AuthenticationService);
      const router = inject(Router);

      if(authService.checkLogin()) {
        router.navigate(['account']);
        return true;
      };

    return true;
  };
}
