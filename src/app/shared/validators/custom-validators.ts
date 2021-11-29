import {AbstractControl, ValidationErrors} from '@angular/forms';


interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}


export class CustomValidators {
  static passwordMatchValidator: ValidatorFn | ValidatorFn[] | null;

  /**
   * Function to control email with custom validator
   */
  static imagecheck(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /^.*\.(jpg|png|gif)$/.test(control.value) ? null : {
      image: true
    };
  }


  /**
   * Function to control password with custom validator
   */
  static upperPwd(control: AbstractControl): ValidationErrors | null {
    return /[A-Z]/g.test(control.value) ? null : {
      upperPwd: true
    }
  }

  static numbersPwd(control: AbstractControl): ValidationErrors | null {
    return /^.*\d+.*$/.test(control.value) ? null : {
      numberPwd: true
    }
  }


  static match(controlName: string, checkControlName: string): ValidatorFn  {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl?.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

}

