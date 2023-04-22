import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

export namespace AuthLoginGuard {

  export const canActivate: CanActivateFn = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => {
      const authService: AuthenticationService = inject(AuthenticationService);
      const router = inject(Router);

      if(!authService.checkLogin()) {
        // alert('não possui login');
        router.navigate(['home/login']);
        return false;
      };
      return true;
  }

  export const canActivateChild: CanActivateChildFn = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => canActivate(route, state);

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

/** return authService.checkLogin().pipe(
              map(() => true),
              catchError(() => {
                  router.navigate(['route-to-fallback-page']);
                  return of(false);
              }
          )
      ); */
