import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Token} from "../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _backendURL: any ;

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
   * Return the JWT token of a user when he connects
   * @param user
   */
  connect(user : User): Observable<any>{
    return this._http.post<Token>(this._backendURL.connection, user).pipe(
      map(t => this.set(t)),
    )
  }

  /**
   * Set the JWT in the localstorage
   * @param token
   */
  set(token : Token) {
    const n = new Date();
    localStorage.setItem('userToken',
      JSON.stringify({
        access_token: token.access_token,
        expiry: n.getTime() + token.expiry,
        id: token.id
      })
    );
  }

  /**
   * Returns the user's token
   */
  getToken() :Token | null{
    let token =localStorage.getItem('userToken');
    if(token){
      let res = JSON.parse(token);
      return res as Token ;
    }else{
      return null;
    }
  }

  /**
   * Returns true if thr user is logged and the token is still valid
   */
  isLogged():boolean{
    let tokenString = localStorage.getItem('userToken');
    if(tokenString){
      let token:Token = JSON.parse(tokenString) as Token;
      if(+token.expiry < Date.now()){
        this.logout();
      }
    }
    return localStorage.getItem('userToken') != null;
  }

  /**
   * Destroy the token in localstorage
   */
  logout():void{
    localStorage.removeItem('userToken');
  }

}
