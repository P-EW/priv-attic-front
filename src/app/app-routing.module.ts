import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeedComponent} from "./feed/feed.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./shared/edit-profile/edit-profile.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {ConnectionComponent} from "./connection/connection.component";
import {AuthGardService} from "./shared/guard/auth-guard.service";
import {InscriptionPersonComponent} from "./inscription-person/inscription-person.component";
import {DeactivatedGuardInscriptionService} from "./shared/guard/deactivated-guard-inscription.service";
import {ExploreComponent} from "./explore/explore.component";
import {NotfoundComponent} from "./notfound/notfound.component";

const routes: Routes = [
  { path: 'home', component: FeedComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGardService] },
  { path: 'profile/:pseudo', component: ProfileComponent },
  { path: 'edit/profile', component: EditProfileComponent, canActivate :[ AuthGardService] },
  { path: 'post', component: CreatePostComponent, canActivate :[ AuthGardService] },
  { path: 'login', component: ConnectionComponent},
  { path: 'inscription', component: InscriptionPersonComponent, canDeactivate: [DeactivatedGuardInscriptionService] },
  { path: '**', component: NotfoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
