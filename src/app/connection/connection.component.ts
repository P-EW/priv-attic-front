import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {CustomValidators} from "../shared/validators/custom-validators";
import {catchError, of} from "rxjs";
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {

  private _retUrl:string | null="";
  private readonly _form: FormGroup;
  private _loginFailedFlag: boolean;

  constructor(private _router: Router, private _authService :AuthService, private _activedRoute: ActivatedRoute) {
    this._form = ConnectionComponent._buildForm();
    this._loginFailedFlag = false;
  }

  ngOnInit(): void {
    //redirect if already logged in
    if(this._authService.isLogged()) this._router.navigate( ['']);


    this._activedRoute.queryParamMap
      .subscribe(params => {
        this._retUrl = params.get('retUrl');
      });
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      pseudo: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        CustomValidators.upperPwd,
        CustomValidators.numbersPwd,
        Validators.minLength(8)
      ])),
    });
  }

  get loginFailed(): boolean {
    return this._loginFailedFlag;
  }

  submit(){
    this._loginFailedFlag = false;
    this._authService.connect(this._form.value)
      .pipe(
        catchError(() => { this._loginFailedFlag = true; return of(null)})
      )
      .subscribe( () => {
        if(!this.loginFailed)
          this._retUrl!=null ? this._router.navigate( [this._retUrl]) : this._router.navigate( [''])
      }
    );
  }

  get form(): FormGroup {
    return this._form;
  }

}
