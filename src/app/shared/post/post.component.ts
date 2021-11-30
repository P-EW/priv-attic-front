import {Component, Input, OnInit} from '@angular/core';
import {Post, User, Like} from "../types";
import {UserService} from "../services/user.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../services/auth.service";
import {LikeService} from "../services/like.service";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger(
      'slideInOut', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class PostComponent implements OnInit {

  private _post: Post;
  private _publisher: User;

  private _hideComments: boolean;
  private _isFav: boolean;
  private _nbLike : number;
  private _shareMsg :string;

  constructor(private _userService: UserService, private _authService :AuthService, private _likeService : LikeService, private _clipboard: Clipboard) {
    this._hideComments = true;
    this._isFav = false;
    this._post = {} as Post;
    this._publisher = {} as User;
    this._nbLike = 0;
    this._shareMsg = 'Click to copy the link !';
  }

  ngOnInit(): void {
    this._userService.fetchOne(this._post.publisherId).subscribe((user:User)=> this._publisher = user);
    this._likeService.getNbLikes(this._post._id).subscribe(
      (nb : number) => this._nbLike = nb
    );
    if(this._authService.isLogged()){
      this._likeService.get(this._post._id, this._authService.getToken()?.id || '').subscribe(
        (b : boolean)=> this._isFav =b
      );
    }
  }


  get hideComments() {
    return this._hideComments;
  }

  swapHideComments(){
    this._hideComments = !this._hideComments;
  }

  @Input()
  set post(post: Post){
    this._post = post;
  }

  get post(): Post {
    return this._post;
  }

  get publisher(): User{
    return this._publisher;
  }

  get isFav(){
    return this._isFav;
  }

  fav(){
    if(this._authService.isLogged()){
      if(!this._isFav){

        this._isFav= true;
        let like = {} as Like;
        like.postId = this._post._id;
        like.authorId = <string>this._authService.getToken()?.id;
        this._likeService.create(like).subscribe(
          () =>  this._nbLike++
        );
      }else{
        this._isFav= false;
        this._likeService.delete(this._post._id, this._authService.getToken()?.id || '').subscribe(
          () => this._nbLike--
        );
      }
    }
  }

  get nbLike(): number {
    return this._nbLike;
  }

  isLogged(): boolean {
    return this._authService.isLogged();
  }

  copyLink() {
    this._shareMsg = 'Link copied !';
    this._clipboard.copy(window.location.origin+'/post/'+this._post._id);
  }

  get shareMsg(){
    return this._shareMsg;
  }

}
