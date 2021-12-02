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
   * Function to create a new like on a post
   */
  create(like: Like): Observable<any>{
    return this._http.post<Like>(this._backendURL.newLike, like, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
  }

  /**
   * delete a like given his autorid and postid
   * @param postId
   * @param authorId
   */
  delete(postId: string, authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.getLikeByPostAndAuthor.replace(':postId',postId).replace(':authorId',authorId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  /**
   * delete all like of an user
   * @param authorId
   */
  deleteAllLikes(authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.deleteUserLikes.replace(':authorId', authorId) , {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  /**
   * get likes from a post and author
   * @param postId
   * @param authorId
   */
  get(postId : string, authorId: string): Observable<any>{
    return this._http.get(this._backendURL.getLikeByPostAndAuthor.replace(':postId',postId).replace(':authorId',authorId));
  }

  /**
   * Returns the number of like of a post
   * @param postId
   */
  getNbLikes(postId: string): Observable<any>{
    return this._http.get(this._backendURL.getNbLike.replace(':postId', postId));
  }

  /**
   * Get the number of like an user received
   * @param pseudo
   */
  getNbLikesAuthor(pseudo: string): Observable<any>{
    return this._http.get(this._backendURL.getNbLikeAuthor.replace(':pseudo', pseudo));
  }

  /**
   * Get the list of liked posts of an user
   * @param authorId
   */
  getLikedPostId(authorId: string): Observable<Like[]> {
    return this._http.get<Like[]>(this._backendURL.getUserLiked.replace(':authorId', authorId));
  }

  /**
   * Delete all like of a post
   * @param postId
   */
  deleteLikesFromPost(postId:string): Observable<any> {
    return this._http.delete<any>(this._backendURL.getLikeByPost.replace(':postId',postId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
  }

}
