import { Injectable } from '@angular/core';
import {User} from "../types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private property to store all backend URLs
  private readonly _backendURL: any;
  private readonly _defaultImage: string;

  constructor(private _http: HttpClient) {
    this._defaultImage = 'https://t3.ftcdn.net/jpg/00/57/04/58/360_F_57045887_HHJml6DJVxNBMqMeDqVJ0ZQDnotp5rGD.jpg';

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

  getImage() : string {
    return this._defaultImage;
  }


  fetchOne(userId: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUserId.replace(':id', userId)).pipe(
      map((user: User) => {
        if(!user?.image){
          user.image = this._defaultImage;
        }
        else{
          user.image = this._backendURL.getFileByName.replace(':filename', user.image);
        }
        return user
      })
    );
  }

  fetchOneFromPseudo(pseudo: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneFromPseudo.replace(':pseudo', pseudo)).pipe(
      map((user: User) => {
        if(!user?.image){
          user.image = this._defaultImage;
        }
        else{
          user.image = this._backendURL.getFileByName.replace(':filename', user.image);
        }
        return user
      })
    );
  }

  create(user : User): Observable<any> {
    return this._http.post(this._backendURL.newUser, user,UserService._options());
  }

  updateOne(user : User, oldPseudo:string): Observable<User> {
    return this._http.patch<User>(this._backendURL.patchUser.replace(':pseudo', oldPseudo), user);
  }

  private static  _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

  upload(file: File, pseudo:string): Observable<User> {
    const formData = new FormData();
    formData.append("file", file);
    return this._http.post<User>(this._backendURL.sendUserImage.replace(':pseudo', pseudo), formData);
  }
}
