import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LocalityStateResolve } from 'src/app/services/locality/locality-state.resolver';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { IncompleteProfileResolver } from './profile/incomplete-profile.resolver';


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
    },
    children: [
      {
        path: 'animal/edit/:id',
        component: EditAnimalComponent
      },
      {
        path: 'animal/register',
        component: RegisterAnimalComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule { }
