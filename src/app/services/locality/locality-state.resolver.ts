import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { IpAddressService } from '../ip-address/ip-address.service';
import { LocalityService } from './locality.service';
import { ProfileService } from 'src/app/entities/profile/profile.service';
import { SimplifiedState, State } from './locality';
import { Observable } from 'rxjs';


export namespace LocalityStateResolve {
  export const updateState: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {

      const ipAddressService: IpAddressService = inject(IpAddressService);
      const localityService: LocalityService = inject(LocalityService);
      const profileService: ProfileService = inject(ProfileService);

      profileService.returnProfile().subscribe((profile) => {

        let stateToSave: SimplifiedState = {
          id: 0, nome: '',
        }

        if(profile.state) {
          stateToSave.nome = profile.state;
          localityService.updateState(stateToSave);

        } else {
          ipAddressService.getIpTest().subscribe((ip) => {
            ipAddressService.getIpAddress(ip).subscribe((ip) => {
              stateToSave.nome = ip.region;
              localityService.updateState(stateToSave);
            });
          })
        }
      })
  }

  export const loadsAllStates: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<State[]> => {

      const localityService: LocalityService = inject(LocalityService);
      return localityService.getStates();
  }
}
