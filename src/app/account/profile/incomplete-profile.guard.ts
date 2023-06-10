import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../../entities/profile/profile.service';
import { Subscription } from 'rxjs';


export namespace IncompleteProfileGuard {
  export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
      const profileService = inject(ProfileService);
      let profileSubscription: Subscription;
      let incomplete = true;

      profileSubscription = profileService.returnProfile().subscribe((profile) => {
        if(
          profile.getPhoto === '' ||
          profile.getName === '' ||
          profile.getCity === '' ||
          profile.getAbout === '' ||
          profile.getTelephone === ''
          ) {
            incomplete = false;
            console.log(`
            It is not allowed to contact the institution without
            first completing the empty fields of the profile
            `)
          };
      });
      profileSubscription.unsubscribe();

      return incomplete;
  }
}
