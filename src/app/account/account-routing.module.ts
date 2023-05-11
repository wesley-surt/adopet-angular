import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnselectedAnimalGuard } from '../authentication/unselected-animal.guard';
import { AnimalsComponent } from './animals/animals.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsResolver } from './animals/animals.resolver';
import { IncompleteProfileGuard } from '../authentication/incomplete-profile.guard';
import { IncompleteProfileResolver } from '../authentication/incomplete-profile.resolver';


const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent,
    resolve: {
      // UnselectedAnimalGuard.canActivate,
      // animals: AnimalsResolver.resolver,
    }
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
        // profileIncomplete: IncompleteProfileResolver.resolver
      }
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
