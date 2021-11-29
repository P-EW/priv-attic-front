import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FeedComponent} from "./feed/feed.component";
import {ConnectionComponent} from "./connection/connection.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'connection', component: ConnectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
