import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { MessageComponent } from './message/message.component';
import { IncompleteProfileGuard } from '../user/profile/incomplete-profile.guard';
import { FeedAdoptionComponent } from './feed-adoption.component';


const routes: Routes = [
  {
    path: '',
    component: FeedAdoptionComponent,
    children: [
      {
        path: '',
        redirectTo: 'animals',
        pathMatch: 'full',
      },
      {
        path: 'animals',
        component: AnimalsFeedComponent,
        children: [
          {
            path: 'profile/:id',
            component: AnimalProfileComponent,
          },
          {
            path: 'message',
            component: MessageComponent,
            // canActivate: [
            //   IncompleteProfileGuard.canActivate,
            //   // UnselectedAnimalGuard.canActivate
            // ]
          },
        ]
      }    

    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FeedAdoptionRoutingModule { }
