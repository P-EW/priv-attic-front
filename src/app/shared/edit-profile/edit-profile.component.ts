import {Component, OnInit} from '@angular/core';
import {User} from "../types";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private _hidePassword: boolean;

  private _model: User;
  private readonly _form: FormGroup;
  private _isPrivate: boolean;
  private _birthdate : string ;
  private _userFile : File;
  private _oldPseudo: string;
  private _isValid: boolean;

  constructor(private _userService: UserService, private _authService :AuthService, private _router: Router) {
    this._hidePassword = true;
    this._model = {} as User;
    this._form = EditProfileComponent._buildForm();
    this._isPrivate = false;
    this._birthdate = '';
    this._oldPseudo = '';
    this._userFile = {} as File;
    this._isValid = true;
  }

  ngOnInit(): void {
    this._userService.fetchOne(this._authService.getToken()?.id || '').subscribe((user:User)=> {
      this._model = user;
      this._birthdate = new Date(this._model.birthDate).toISOString();
      this._oldPseudo = user.pseudo;
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

  swapIsPrivate(isPrivate : boolean) {
    this._isPrivate = isPrivate;
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
      motto: new FormControl(),
    });
  }

  onFileSelected($event: any){
    const file:File = $event.target.files[0];
    if (file) {
      this._userFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this._model.image = reader.result+'';
      };
    }
  }

  private _upload(user:User){
    if (this._userFile?.name) {
      this._userService.upload(this._userFile, user.pseudo).subscribe(() => this._router.navigate( ['profile']));
    }
  }

  submit(user: User): void {
    user.birthDate = new Date(this._birthdate).getTime();
    user.isPrivate = this._isPrivate;

    if(!this._userFile?.name || ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(this._userFile.type)) {
      this._userService.updateOne(user, this._oldPseudo).subscribe((u: User) => this._upload(u));
    }
    else {
      this._isValid = false;
    }
  }

  get isValid(): boolean{
    return this._isValid;
  }
}
