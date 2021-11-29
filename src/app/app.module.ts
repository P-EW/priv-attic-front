import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppRoutingModule} from "./app-routing.module";
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './shared/post/post.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {HttpClientModule} from "@angular/common/http";
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './shared/comment/comment.component';
import {MatInputModule} from "@angular/material/input";
import { ProfileComponent } from './profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { CreatePostComponent } from './create-post/create-post.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ConnectionComponent } from './connection/connection.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    ProfileComponent,
    EditProfileComponent,
    CreatePostComponent,
    ConnectionComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    RouterModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
