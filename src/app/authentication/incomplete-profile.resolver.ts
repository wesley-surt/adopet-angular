import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { TokenService } from './token/token.service';
import { inject } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { map, tap } from 'rxjs';
import { ProfileClass } from './profile/profile-class';


export namespace IncompleteProfileResolver {

  export const resolver: ResolveFn<boolean> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const tokenService = inject(TokenService);
    const profileService = inject(ProfileService);

    let incomplete = false;
    
    profileService.returnProfile().subscribe((profile) => {
      if(
        profile.getPhoto === '' ||
        profile.getName === '' ||
        profile.getCity === '' ||
        profile.getAbout === '' ||
        profile.getTelephone === ''
        ) incomplete = true;
    });
      
    return incomplete;
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
