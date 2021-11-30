import {Component, EventEmitter, OnInit} from '@angular/core';
import {IDeactivateComponent} from "../shared/guard/deactivated-guard-inscription.service";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/types";
import {UserService} from "../shared/services/user.service";
import {CustomValidators} from "../shared/validators/custom-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription-person',
  templateUrl: './inscription-person.component.html',
  styleUrls: ['./inscription-person.component.css']
})
export class InscriptionPersonComponent implements OnInit, IDeactivateComponent {

  private readonly _cancel$: EventEmitter<void>;
  private readonly _form: FormGroup;

  private _model: User;
  private _hidePassword: boolean;
  _isPrivate: boolean;
  private _userFile : File;
  private _isValid: boolean;

  constructor(private _userService : UserService, private _router : Router,) {
    this._hidePassword = true;
    this._isPrivate = false;
    this._model = {} as User;
    this._model.image = this._userService.getImage();
    this._cancel$ = new EventEmitter<void>();
    this._form = InscriptionPersonComponent._buildForm();
    this._userFile = {} as File;
    this._isValid = true;
  }
  get model(): User {
    return this._model;
  }
  ngOnInit(): void {
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
        Validators.required,
        CustomValidators.upperPwd,
        CustomValidators.numbersPwd,
        Validators.minLength(8)
      ])),
      password2: new FormControl('', Validators.compose([
        Validators.required,

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
      isPrivate: new FormControl(),
    },{validators : CustomValidators.match('password','password2')} );
  }

  onFileSelected($event: any){
    const file:File = $event.files[0];
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
      this._userService.upload(this._userFile, user.pseudo).subscribe(() => this._router.navigate( ['login']));
    }
  }

  submit(): void {
    delete this.form.value.password2;
    let user = this.form.value as User;
    user.phone = this.convert0to33(user.phone);
    user.isPrivate = this._isPrivate;
    user.birthDate = new Date(user.birthDate).getTime();

    if(!this._userFile?.name || ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(this._userFile.type)){
      this._userService.create(user).subscribe(() => {
        this._userService.updateOne(user, user.pseudo).subscribe((u:User) => this._upload(u));
        this._router.navigate(['login'])
      });
    }
    else {
      this._isValid = false;
    }
  }

  get isValid(): boolean{
    return this._isValid;
  }

  isPrivate(checked: boolean): void {
    this._form.patchValue({isPrivate: checked});
  }

  canExit(): Observable<boolean> | Promise<boolean> | boolean {
    return (confirm("do you really want to leave the page without having finalized your registration?"));
  }

  convert0to33(phone : string): string{
    if(phone.charAt(0) == '0'){
      return phone.split('0').join('+33');
    }else{
      return phone;
    }
  }

}
