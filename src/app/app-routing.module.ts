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

const routes: Routes = [
  { path: '', component: FeedComponent  },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGardService]},
  { path: 'profile/:pseudo', component: ProfileComponent },
  { path: 'edit/profile', component: EditProfileComponent, canActivate :[ AuthGardService]},
  { path: 'post', component: CreatePostComponent, canActivate :[ AuthGardService] },
  { path: 'login', component: ConnectionComponent},
  { path: 'inscription', component: InscriptionPersonComponent, canDeactivate: [DeactivatedGuardInscriptionService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
