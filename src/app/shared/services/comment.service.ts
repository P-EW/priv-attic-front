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
   * Returns private property _defaultComment
   */
  get defaultComment(): Comment {
    return this._defaultComment;
  }

  /**
   * Fetch all comments of a post
   * @param postId
   */
  fetchFromPost(postId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(this._backendURL.commentsFromPost.replace(':id', postId))
      .pipe(
        filter((comments:Comment[]) => !!comments),
        defaultIfEmpty([])
      )
  }

  /**
   * Fetch all comments of a user
   * @param authorId
   */
  fetchFromAuthor(authorId: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(this._backendURL.commentsFromAuthor.replace(':authorId', authorId))
      .pipe(
        filter((comments:Comment[]) => !!comments),
        defaultIfEmpty([])
      )
  }

  /**
   * Create a comment
   * @param comment
   */
  create(comment : Comment): Observable<any> {
    return this._http.post<any>(this._backendURL.newComment, comment, CommentService._options({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}` }));
  }

  /**
   * Delete all comments a user published
   * @param authorId
   */
  deleteAllComments(authorId : string) : Observable<any>{
    return this._http.delete(this._backendURL.deleteUserComments.replace(':authorId', authorId, CommentService._options({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}` })));
  }

  /**
   * Delete a comment of a post
   * @param postId
   */
  delete(postId: string): Observable<any> {
    return this._http.delete<any>(this._backendURL.deletecomment.replace(':postId', postId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  private static  _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

}
