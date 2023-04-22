import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';


export namespace IncompleteProfileResolver {

  export const resolver: ResolveFn<String> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const selectText = '';

    return selectText;
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
