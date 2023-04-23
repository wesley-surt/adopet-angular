import { Injectable, inject } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { Animals } from './animals';
import { AnimalsService } from '../animals.service';


export namespace AnimalsResolver {

  export const resolve: ResolveFn<Animals> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Animals> => {

      const router = inject(Router);
      const animalsService: AnimalsService = inject(AnimalsService);

      return animalsService.getAnimals().pipe(
        tap((animals) => {
          return animals.allAnimals;
      }));
  }
}
