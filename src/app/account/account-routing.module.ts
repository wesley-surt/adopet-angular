import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'animals',
    pathMatch: 'full'
  },
  {
    path: 'animalsForAdoption',
    loadChildren: () => import('./animals-for-adoption/animals-for-adoption.module')
    .then(module => module.AnimalsForAdoptionModule),

  },
  {
    path: 'profileUser',
    loadChildren: () => import('./profile/profile.module')
    .then(module => module.ProfileModule),

  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
