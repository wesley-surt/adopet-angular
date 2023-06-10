import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

export namespace AuthLoginGuard {

  export const canActivateAccountModule: CanActivateFn = (
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

  export const canActivateAccountModuleChild: CanActivateChildFn = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => canActivateAccountModule(route, state);

  export const canLoad: CanActivateFn = (
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
