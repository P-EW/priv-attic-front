import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeedComponent} from "./feed/feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./shared/edit-profile/edit-profile.component";
import {CreatePostComponent} from "./create-post/create-post.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:pseudo', component: ProfileComponent },
  { path: 'edit/profile', component: EditProfileComponent },
  { path: 'post', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
