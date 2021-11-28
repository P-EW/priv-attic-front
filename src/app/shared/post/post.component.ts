import {Component, Input, OnInit} from '@angular/core';
import {Post, User} from "../types";
import {UserService} from "../services/user.service";
import {animate, style, transition, trigger} from "@angular/animations";

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
  private _isFav: boolean;   // TODO A FETCHER PLUS TARD

  constructor(private _userService: UserService) {
    this._hideComments = true;
    this._isFav = false;
    this._post = {} as Post;
    this._publisher = {} as User;
  }

  ngOnInit(): void {
    this._userService.fetchOne(this._post.publisherId).subscribe((user:User)=> this._publisher = user);
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
    this._isFav = !this._isFav;
  }

  profilePicture(): string {
    return this._publisher.image;
  }
}
