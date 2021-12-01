import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Like} from "../types";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private readonly _backendURL : any ;
  constructor(private _http: HttpClient) {
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
   * Function to create a new person
   */
  create(like: Like): Observable<any>{
    return this._http.post<Like>(this._backendURL.newLike, like, this._options())
  }

  delete(postId: string, authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.getLikeByPostAndAuthor.replace(':postId',postId).replace(':authorId',authorId));
  }

  get(postId : string, authorId: string): Observable<any>{
    return this._http.get(this._backendURL.getLikeByPostAndAuthor.replace(':postId',postId).replace(':authorId',authorId));
  }

  getNbLikes(postId: string): Observable<any>{
    return this._http.get(this._backendURL.getNbLike.replace(':postId', postId));
  }

  getNbLikesAuthor(pseudo: string): Observable<any>{
    return this._http.get(this._backendURL.getNbLikeAuthor.replace(':pseudo', pseudo));
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
