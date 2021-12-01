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

  fetchUserPosts(user: string): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.postFromPseudo.replace(':pseudo', user, {headers: new HttpHeaders(Object.assign({ 'Authorization': `Bearer ${this._authService.getToken()?.access_token}`}))}))
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

  upload(file: File, postId:string): Observable<Post> {
    const formData = new FormData();
    formData.append("file", file);
    return this._http.post<Post>(this._backendURL.sendPostImage.replace(':id', postId), formData);
  }

  create(post : Post): Observable<Post> {
    return this._http.post<Post>(this._backendURL.newPost, post);
  }
}
