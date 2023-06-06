import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnselectedAnimalGuard } from '../authentication/unselected-animal.guard';
import { AnimalsComponent } from './animals/animals.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { IncompleteProfileGuard } from '../authentication/incomplete-profile.guard';
import { IncompleteProfileResolver } from '../authentication/incomplete-profile.resolver';
import { IpAddressResolver } from '../services/ip-address/ip-address.resolver';


const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent,
    resolve: {
      resolve: IpAddressResolver.resolver
    },
    canActivate: [
      // UnselectedAnimalGuard.canActivate
    ]
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [
      IncompleteProfileGuard.canActivate,
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
        profileIncomplete: IncompleteProfileResolver.resolver
      }
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
