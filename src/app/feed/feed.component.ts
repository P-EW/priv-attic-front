import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/types";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private _posts: Post[];

  constructor(private _postService: PostService, private _authService :AuthService) {
    this._posts = [];
  }

  ngOnInit(): void {
    if(this._authService.isLogged()){
      this._postService.fetchFeed().subscribe({ next: (posts: Post[]) => this._posts = posts.sort((a:Post, b:Post) => +b.date - +a.date)});
    }
  }

  get posts(): Post[]{
    return this._posts
  }

  isLogged(): boolean {
    return this._authService.isLogged();
  }

}
