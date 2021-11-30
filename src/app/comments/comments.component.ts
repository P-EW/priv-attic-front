import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../shared/types";
import {CommentService} from "../shared/services/comment.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  private _comments: Comment[];

  private _postId: string;

  constructor(private _commentService: CommentService, private _authService :AuthService) {
    this._comments = [];
    this._postId = '';
  }

  ngOnInit(): void {
    this._commentService.fetchFromPost(this._postId).subscribe({ next: (comments: Comment[]) => this._comments = comments.sort((a:Comment, b:Comment) => +a.date - +b.date)});
  }

  get comments(): Comment[]{
    return this._comments;
  }

  @Input()
  set postId(postId: string){
    this._postId = postId;
  }

  isLogged(): boolean {
    return this._authService.isLogged();
  }

}
