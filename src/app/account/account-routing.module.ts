import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    loadChildren: () => import('./animals-for-adoption/animals-for-adoption.module')
    .then(module => module.AnimalsForAdoptionModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module')
    .then(module => module.ProfileModule)
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
