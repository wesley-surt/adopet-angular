import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncompleteProfileGuard } from '../authentication/incomplete-profile.guard';
import { UnselectedAnimalGuard } from '../authentication/unselected-animal.guard';
import { AnimalsComponent } from './animals/animals.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsResolver } from './animals/animals.resolver';


const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent,
    resolve: {
      animais: AnimalsResolver.resolve
    }
  },
  {
    path: 'message',
    component: MessageComponent,
    // canActivate: [
    //   UnselectedAnimalGuard.canActivate,
    //   IncompleteProfileGuard.canActivate
    // ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [
    //   IncompleteProfileGuard.resolver
    // ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
