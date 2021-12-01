import { Injectable } from '@angular/core';
import {Comment} from "../types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {defaultIfEmpty, filter, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default post
  private readonly _defaultComment: Comment;

  constructor(private _http: HttpClient, private _authService :AuthService) {
    this._defaultComment = {
      _id: "1",
      authorId: "1",
      content: "Bonjour ! Ceci est un exemple de comment !",
      date: "1636195396259",
      postId: "1"
    };

    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns private property _defaultPost
   */
  get defaultComment(): Comment {
    return this._defaultComment;
  }

  fetchFromPost(postId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(this._backendURL.commentsFromPost.replace(':id', postId))
      .pipe(
        filter((comments:Comment[]) => !!comments),
        defaultIfEmpty([])
      )
  }

  fetchFromAuthor(authorId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(this._backendURL.commentsFromAuthor.replace(':authorId', authorId))
      .pipe(
        filter((comments:Comment[]) => !!comments),
        defaultIfEmpty([])
      )
  }

  create(comment : Comment): Observable<any> {
    return this._http.post<any>(this._backendURL.newComment, comment, CommentService._options({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}` }));
  }

  delete(postId: string): Observable<any> {
    return this._http.delete<any>(this._backendURL.deletecomment.replace(':postId', postId));
  }

  private static  _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

}
