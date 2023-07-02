import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/entities/profile/profile.service';


export namespace IncompleteProfileResolver {

  export const resolver: ResolveFn<boolean> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const profileService = inject(ProfileService);
    let profileSubscription: Subscription;
    let incomplete = false;

    profileSubscription = profileService.returnProfile().subscribe((profile) => {
      if(
        profile.getPhoto === '' ||
        profile.getName === '' ||
        profile.getCity === '' ||
        profile.getAbout === '' ||
        profile.getTelephone === ''
        ) incomplete = true;
    });
    profileSubscription.unsubscribe();

    return incomplete;
  }
}
