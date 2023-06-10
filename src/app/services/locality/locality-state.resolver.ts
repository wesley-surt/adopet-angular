import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { IpAddressService } from '../ip-address/ip-address.service';
import { LocalityService } from './locality.service';
import { ProfileService } from 'src/app/entities/profile/profile.service';


export namespace LocalityStateResolve {
  export const resolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {

      const ipAddressService: IpAddressService = inject(IpAddressService);
      const localityService: LocalityService = inject(LocalityService);
      const profileService: ProfileService = inject(ProfileService);

      profileService.returnProfile().subscribe((profile) => {
        if(profile.state) {
          localityService.updateState(profile.state);
        } else {
          ipAddressService.getIpAddress().subscribe((ip) => {
            localityService.updateState(ip.region);
          });
        }
      })
  }
}
