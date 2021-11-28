import { Injectable } from '@angular/core';
import {User} from "../types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, map, mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default user
  private readonly _defaultUser: User;

  constructor(private _http: HttpClient) {
    this._defaultUser = {
      firstname: 'default',
      lastname: 'user',
      pseudo: 'defaultuser',
      email: 'default@user.com',
      birthdate: new Date(),
      phone: '0000000000',
      image : 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      isPrivate: true,
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
   * Returns private property _defaultUser
   */
  get defaultUser(): User {
    return this._defaultUser;
  }

  fetchOne(userId: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUserId.replace(':id', userId)).pipe(
      map((user: User) => {
        if(!user?.image){
          user.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
        }
        return user
      })
    );
  }
}
