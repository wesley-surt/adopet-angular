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
    loadChildren: () => import('./feed-adoption/feed-adoption.module')
    .then(module => module.FeedAdoptionModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
    .then(module => module.UserModule)
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
