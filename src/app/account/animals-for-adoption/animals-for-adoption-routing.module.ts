import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncompleteProfileGuard } from '../profile/incomplete-profile.guard';
import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { MessageComponent } from './message/message.component';


const routes: Routes = [
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
    path: 'profile/:id',
    component: AnimalProfileComponent,
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [
      IncompleteProfileGuard.canActivate,
      // UnselectedAnimalGuard.canActivate
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AnimalForAdoptionRoutingModule { }
