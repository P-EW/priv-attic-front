import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {CustomValidators} from "../shared/validators/custom-validators";
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {

  private _retUrl:string | null="";
  private readonly _form: FormGroup;

  constructor(private _router: Router, private _authService :AuthService, private _activedRoute: ActivatedRoute) {
    this._form = ConnectionComponent._buildForm();
  }

  ngOnInit(): void {
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
  // @ts-ignore
  submit(){
    this._authService.connect(this._form.value).subscribe(
     //TODO afficher un message d'erreur si c'est pas bon
      () => {
        if (this._retUrl!=null) {
          this._router.navigate( [this._retUrl]);
        } else {
          this._router.navigate( ['']);
        }
      },
      );

  }

  get form(): FormGroup {
    return this._form;
  }

}
