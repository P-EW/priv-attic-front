import { Component, OnInit } from '@angular/core';
import {Like, Post, User} from "../shared/types";
import {UserService} from "../shared/services/user.service";
import {PostService} from "../shared/services/post.service";
import {CommentService} from "../shared/services/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {merge, mergeMap, filter} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {LikeService} from "../shared/services/like.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;
  private _posts: Post[];
  private _likedPosts: Post[];
  private _nblikes: number;

  constructor(private _userService: UserService, private _postService: PostService, private _commentService: CommentService, private _route: ActivatedRoute, private _router: Router, private _authService :AuthService, private _likeService : LikeService) {
    this._user = {} as User;
    this._posts = [];
    this._likedPosts = [];
    this._nblikes = 0;
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.pseudo),
        mergeMap((params: any) => this._userService.fetchOneFromPseudo(params.pseudo)),
      ),
      this._route.params.pipe(
        filter((params: any) => !params.pseudo),
        mergeMap(() =>
          // we don't bother with '' -> you can't access here if you're not logged so token id MUST be defined
          this._userService.fetchOne(this._authService.getToken()?.id || '')
        ),
      )
    )
      .subscribe({
        next: (user: User) => {
          this._user = user;
          this._postService.fetchUserPosts(user?.pseudo).subscribe((posts: Post[])=> this._posts = posts.sort((a:Post, b:Post) => +b.date - +a.date));
          this._likeService.getNbLikesAuthor(user?.pseudo || '').subscribe((likes:Like[])=> this._nblikes = likes.length);
          this._likeService.getLikedPostId(user.id).subscribe(
            (likes:Like[]) => likes.map((like:Like) => this._postService.fetchOne(like.postId).subscribe((post:Post) => this._likedPosts.push(post)),
          ))
        },
        error: () => {
          // manage error when user doesn't exist in DB
          this._router.navigate(['home']);
        }
      });
  }

  get user(): User {
    return this._user;
  }

  get posts(): Post[]{
    return this._posts;
  }

  get likedPosts(): Post[]{
    return this._likedPosts;
  }

  get nbLikes(): number{
    return this._nblikes;
  }

  motto(): string{
    return this._user.motto?.map(motto => motto.title).join(',') || ''; //TODO, voir plus tard ce qu'on en fait...
  }

  isLogged(): boolean {
    return this._authService.isLogged();
  }
}
