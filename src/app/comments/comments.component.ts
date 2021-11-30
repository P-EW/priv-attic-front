import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../shared/types";
import {CommentService} from "../shared/services/comment.service";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  private _comments: Comment[];
  private readonly _form: FormGroup;

  private _postId: string;
  private _authorId: string;

  constructor(private _commentService: CommentService, private _authService :AuthService) {
    this._comments = [];
    this._postId = '';
    this._authorId = '';
    this._form = CommentsComponent._buildForm();
  }

  ngOnInit(): void {
    this._commentService.fetchFromPost(this._postId).subscribe({ next: (comments: Comment[]) => this._comments = comments.sort((a:Comment, b:Comment) => +a.date - +b.date)});
    this._authorId = this._authService.getToken()?.id || '';
  }

  get form(): FormGroup {
    return this._form;
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      textContent: new FormControl('', Validators.compose([
        Validators.maxLength(128), Validators.required
      ]))
    });
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

  submit(content: string) {
    let comment: Comment = {} as Comment;
    comment.content = content.trim();
    comment.authorId = this._authorId;
    comment.postId = this._postId;

    if (comment.content && this.isLogged()){
      this._commentService.create(comment).subscribe((comment: Comment)=> this._comments.push(comment));
    }
  }

}
