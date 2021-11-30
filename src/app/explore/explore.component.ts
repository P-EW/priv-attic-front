import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/types";
import {PostService} from "../shared/services/post.service";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  private _posts: Post[];

  constructor(private _postService: PostService, private _authService :AuthService, private _route: ActivatedRoute, private _router: Router) {
    this._posts = [];
  }

  ngOnInit(): void {
    this._route.params.pipe(
      filter((params: any) => !!params.id),
    ).subscribe(
      (params: any) => this._postService.fetchOne(params.id).subscribe((post:Post) => this._posts.push(post))
    )

    this._route.params.pipe(
      filter((params: any) => !params.id),
    ).subscribe(
      () => {
        this._postService.fetchFeed().subscribe({
          next: (posts: Post[]) => {
            if(this._authService.isLogged()){
              let userId = this._authService.getToken()?.id || '';
              posts = posts.filter((post:Post) => post.publisherId !== userId);
            }
            this._posts = posts.sort((a:Post, b:Post) => +b.date - +a.date)
          }
        });
      }
    )
  }

  get posts(): Post[]{
    return this._posts
  }

}
