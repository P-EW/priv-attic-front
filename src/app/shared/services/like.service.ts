import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Like} from "../types";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private readonly _backendURL : any ;
  constructor(private _http: HttpClient, private _authService :AuthService) {
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
    return this._http.post<Like>(this._backendURL.newLike, like, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
  }

  delete(postId: string, authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.getLikeByPostAndAuthor.replace(':postId',postId).replace(':authorId',authorId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  deleteAllLikes(authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.deleteUserLikes.replace(':authorId', authorId) , {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
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

  getLikedPostId(authorId: string): Observable<Like[]> {
    return this._http.get<Like[]>(this._backendURL.getUserLiked.replace(':authorId', authorId));
  }

  deleteLikesFromPost(postId:string): Observable<any> {
    return this._http.delete<any>(this._backendURL.getLikeByPost.replace(':postId',postId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
  }

}
