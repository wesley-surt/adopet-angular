import { IpAddressService } from './../../services/ip-address/ip-address.service';
import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { LocalityService } from 'src/app/services/locality/locality.service';


export namespace IpAddressResolver {
  export const resolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {

      const ipAddressService: IpAddressService = inject(IpAddressService);
      const localityService: LocalityService = inject(LocalityService);

      ipAddressService.getIpAddress().subscribe((ip) => {
          localityService.updateState(ip.region);
      });
  }
}
