import {Component, OnInit} from '@angular/core';
import {User} from "../types";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // TODO gerer l'image et le motto
  // TODO faire une verification de formulaire pour image et motto ?
  // TODO GUARD d'accès à cette page

  private _hidePassword: boolean;

  private _model: User;
  private readonly _form: FormGroup;

  constructor(private _userService: UserService) {
    this._hidePassword = true;
    this._model = {} as User;
    this._form = EditProfileComponent._buildForm();
  }

  ngOnInit(): void {
    this._userService.fetchOneFromPseudo("P-EW").subscribe((user:User)=> {
      this._model = user;
      this._model.birthDate = new Date(this._model.birthDate + new Date().getTimezoneOffset()*60*1000).toISOString()
      this._form.patchValue(this._model)
    });
  }

  get hidePassword(): boolean {
    return this._hidePassword;
  }

  swapHidePassword(): void {
    this._hidePassword = !this._hidePassword;
  }

  get form(): FormGroup {
    return this._form;
  }

  get model(): User {
    return this._model;
  }

  /**
   * Function to build our form
   */
  private static _buildForm(): FormGroup {
    return new FormGroup({
      image: new FormControl(),
      firstname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      pseudo:  new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(3)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('(0|\\+33)\\d{9}')
      ])),
      birthDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
}
