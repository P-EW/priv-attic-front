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
import { ConnectionComponent } from './connection/connection.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    ConnectionComponent,
  ],
    imports: [
        RouterModule,
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
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
