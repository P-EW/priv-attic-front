import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/types";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private _posts: Post[];

  constructor(private _postService: PostService) {
    this._posts = [];
  }

  ngOnInit(): void {
    this._postService.fetchFeed().subscribe({ next: (posts: Post[]) => this._posts = posts.sort((a:Post, b:Post) => +b.date - +a.date)});
  }

  get posts(): Post[]{
    return this._posts
  }

}
