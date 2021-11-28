import {Component, Input, OnInit} from '@angular/core';
import {User, Comment} from "../types";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  private _comment: Comment;
  private _author: User;

  constructor(private _userService: UserService) {
    this._comment = {} as Comment;
    this._author = {} as User;
  }

  ngOnInit(): void {
    this._userService.fetchOne(this._comment.authorId).subscribe((user:User)=> this._author = user);
  }

  @Input()
  set comment(comment: Comment){
    this._comment = comment;
  }

  get comment(): Comment{
    return this._comment;
  }

  get author(): User{
    return this._author;
  }

}
