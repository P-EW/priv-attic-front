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
import {SearchComponent} from "./search/search.component";
import {CategComponent} from "./categ/categ.component";

const routes: Routes = [
  { path: 'home', component: FeedComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGardService] },
  { path: 'profile/:pseudo', component: ProfileComponent },
  { path: 'edit/profile', component: EditProfileComponent, canActivate :[ AuthGardService] },
  { path: 'post', component: CreatePostComponent, canActivate :[ AuthGardService] },
  { path: 'post/:id', component: ExploreComponent },
  { path: 'categs', component: CategComponent },
  { path: 'categs/:categs', component: CategComponent },
  { path: 'login', component: ConnectionComponent },
  { path: 'inscription', component: InscriptionPersonComponent, canDeactivate: [DeactivatedGuardInscriptionService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
