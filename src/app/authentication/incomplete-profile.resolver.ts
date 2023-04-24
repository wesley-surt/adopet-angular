import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { TokenService } from '../entities/token/token.service';
import { inject } from '@angular/core';
import { ProfileService } from '../entities/profile/profile.service';
import { map, tap } from 'rxjs';
import { ProfileClass } from '../entities/profile/profile-class';


export namespace IncompleteProfileResolver {

  export const resolver: ResolveFn<boolean> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
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
