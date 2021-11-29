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
  private _isPrivate: boolean;
  private _birthdate : string ;

  constructor(private _userService: UserService) {
    this._hidePassword = true;
    this._model = {} as User;
    this._form = EditProfileComponent._buildForm();
    this._isPrivate = false;
    this._birthdate = '';
  }

  ngOnInit(): void {
    this._userService.fetchOneFromPseudo("P-EW").subscribe((user:User)=> {
      this._model = user;
      this._birthdate = new Date(this._model.birthDate).toISOString();
      this._form.patchValue(this._model)

      this._isPrivate = this._model.isPrivate;
    });
  }
  get birthdate() :string {
    return this._birthdate;
  }

  get hidePassword(): boolean {
    return this._hidePassword;
  }

  swapHidePassword(): void {
    this._hidePassword = !this._hidePassword;
  }

  swapIsPrivate() {
    this._isPrivate = !this._isPrivate;
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

  submit(user: User): void {
    user.birthDate = new Date(this._birthdate).getTime();
    user.isPrivate = this._isPrivate;
    //TODO FAIRE UN PATCH OU UN POST SELON INSCRIPTION/MàJ
    console.log(user);
  }
}
