import { Injectable } from '@angular/core';
import {Comment} from "../types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {defaultIfEmpty, filter, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default post
  private readonly _defaultComment: Comment;

  constructor(private _http: HttpClient) {
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
}
