import { Injectable } from '@angular/core';
import {Post} from "../types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {defaultIfEmpty, filter, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default post
  private readonly _defaultPost: Post;

  constructor(private _http: HttpClient) {
    this._defaultPost = {
      _id: "1",
      publisherId: "1",
      textContent: "Bonjour ! Ceci est un exemple de post !",
      mediaContent: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      date: "1636195396259",
      categories: ["dog", "photography"]
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
  get defaultPost(): Post {
    return this._defaultPost;
  }

  fetchFeed(): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.allPosts)
      .pipe(
        filter((posts:Post[]) => !!posts),
        defaultIfEmpty([])
      )
  }

  fetchUserPosts(user: string): Observable<Post[]> {
    return this._http.get<Post[]>(this._backendURL.postFromPseudo.replace(':pseudo', user))
      .pipe(
        filter((posts:Post[]) => !!posts),
        defaultIfEmpty([])
      )
  }
}
