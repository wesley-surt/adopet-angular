import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './authentication/auth-login.guard';
import { LocalityStateResolve } from './services/locality/locality-state.resolver';

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
    canLoad: [ AuthLoginGuard.canLoad ]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(module => module.AccountModule),
    resolve: { resolve: LocalityStateResolve.updateState },
    canActivate: [ AuthLoginGuard.canActivateAccountModule ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
