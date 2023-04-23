import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { TokenService } from './token/token.service';
import { inject } from '@angular/core';
import { ProfileService } from './profile/profile.service';


export namespace IncompleteProfileResolver {

  export const resolver: ResolveFn<boolean> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {

  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class IncompleteProfileResolver implements Resolve<boolean> {
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return of(true);
//   }
// }
