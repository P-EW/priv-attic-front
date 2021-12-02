import { Injectable } from '@angular/core';
import {Post} from "../types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {defaultIfEmpty, filter, Observable, map} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private property to store all backend URLs
  private readonly _backendURL: any;

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
   * Fetch every posts from the database
   */
  fetchFeed(): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.allPosts, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
      .pipe(
        filter((posts:Post[]) => !!posts),
        map((posts: Post[]) =>
          posts.map((post:Post) => {
            if(post?.mediaContent) {post.mediaContent = this._backendURL.getFileByName.replace(':filename', post.mediaContent);}
            return post;
          }),
        ),
        defaultIfEmpty([])
      )
  }

  /**
   * Fetch all posts of a given user
   * @param user pseudo of user
   */
  fetchUserPosts(user: string): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.postFromPseudo.replace(':pseudo',user),  {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
      .pipe(
        filter((posts:Post[]) => !!posts),
        map((posts: Post[]) =>
          posts.map((post:Post) => {
            if(post?.mediaContent) {post.mediaContent = this._backendURL.getFileByName.replace(':filename', post.mediaContent);}
            return post;
          }),
        ),
        defaultIfEmpty([])
      )
  }

  /**
   * Fetch all post matching an array of categories
   * @param categ an array of categories
   */
  fetchPostsCateg(categ: string[]): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.postFromCateg.replace(':categs', categ, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))}))
      .pipe(
        filter((posts:Post[]) => !!posts),
        map((posts: Post[]) =>
          posts.map((post:Post) => {
            if(post?.mediaContent) {post.mediaContent = this._backendURL.getFileByName.replace(':filename', post.mediaContent);}
            return post;
          }),
        ),
        defaultIfEmpty([])
      )
  }

  /**
   * Returns a Post given it's it
   * @param postId
   */
  fetchOne(postId: string): Observable<Post> {
    return this._http.get<Post>(this._backendURL.onePost.replace(':id', postId, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))}))
      .pipe(
        filter((post:Post) => !!post),
        map((post:Post) => {
          if(post?.mediaContent) {post.mediaContent = this._backendURL.getFileByName.replace(':filename', post.mediaContent);}
          return post;
        }),
        defaultIfEmpty({} as Post)
      )
  }

  /**
   * Deletes a post given its id
   * @param postId
   */
  deleteOne(postId:string) {
    return this._http.delete<any>(this._backendURL.onePost.replace(':id',postId), {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))})
  }

  /**
   * Upload a post's image given his id
   * @param file the image
   * @param postId
   */
  upload(file: File, postId:string): Observable<Post> {
    const formData = new FormData();
    formData.append("file", file);
    return this._http.post<Post>(this._backendURL.sendPostImage.replace(':id', postId), formData, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  /**
   * Create post from parameter
   * @param post the post to create
   */
  create(post : Post): Observable<Post> {
    return this._http.post<Post>(this._backendURL.newPost, post, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))});
  }

  /**
   * Delete all posts of an user
   * @param authorId
   */
  deleteAllPost(authorId: string): Observable<any>{
    return this._http.delete(this._backendURL.deleteUserPosts.replace(':publisherId', authorId, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))}));
  }
}
