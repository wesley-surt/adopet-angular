import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Observable, map } from 'rxjs';


export namespace RegisterAnimalForAdoptionGuard {
  export const canActivate: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>
  {
    const profileService: ProfileService = inject(ProfileService);
    const booleanObservable = profileService.returnProfile()
    .pipe(
      map((profile) => profile._id ? true : false)
    );

    return booleanObservable;
  }
}
