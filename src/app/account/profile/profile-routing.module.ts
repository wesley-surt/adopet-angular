import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { IncompleteProfileResolver } from './incomplete-profile.resolver';
import { LocalityStateResolve } from 'src/app/services/locality/locality-state.resolver';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      profileIncomplete: IncompleteProfileResolver.resolver,
      states: LocalityStateResolve.loadsAllStates
    }
  },
  {
    path: 'registerAnimal',
    component: RegisterAnimalComponent
  },
  {
    path: 'editAnimal',
    component: EditAnimalComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ProfileRoutingModule { }
