import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'animals',
        pathMatch: 'full'
      },
      {
        path: 'animals',
        component: AnimalsFeedComponent,
      },
      {
        path: 'profileAnimal',
        component: AnimalProfileComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'editAnimal',
        component: EditAnimalComponent,
      },
      {
        path: 'registerAnimal',
        component: RegisterAnimalComponent,
      },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AccountRoutingModule { }
