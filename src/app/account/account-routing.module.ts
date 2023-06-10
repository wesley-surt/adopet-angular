import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnselectedAnimalGuard } from '../authentication/unselected-animal.guard';
import { AnimalsComponent } from './animals/animals.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { IncompleteProfileGuard } from './profile/incomplete-profile.guard';
import { IncompleteProfileResolver } from './profile/incomplete-profile.resolver';


const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [
      IncompleteProfileGuard.canActivate,
      // UnselectedAnimalGuard.canActivate
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
