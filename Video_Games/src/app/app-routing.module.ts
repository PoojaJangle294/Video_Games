import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGamesComponent } from './video-games/video-games.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '', component:VideoGamesComponent
  },
  {
    path: 'contact', component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
