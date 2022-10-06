import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  passwordsIguales( password: string, confirmPassword: string ) {

    return ( formGroup: FormGroup ) => {

      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if ( passwordControl.value === confirmPasswordControl.value ) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ noEsIgual: true });
      }
    }
  }
}
