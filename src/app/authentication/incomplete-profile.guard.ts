import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './profile/profile.service';


export namespace IncompleteProfileGuard {
  export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
      const profileService = inject(ProfileService);
      let incomplete = true;
      
      profileService.returnProfile().subscribe((profile) => {
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
        
      return incomplete;
  }
}
