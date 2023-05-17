import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './authentication/auth-login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(module => module.HomeModule),
    // canLoad: [ AuthLoginGuard.canLoad ]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(module => module.AccountModule),
    // canActivate: [ AuthLoginGu ard.canActivateChild ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
