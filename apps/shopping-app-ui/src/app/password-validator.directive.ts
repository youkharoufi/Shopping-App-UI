import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[passwordValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordValidatorDirective),
      multi: true
    }
  ]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasNonAlphabeticalCharacters = /[^\w\s]/i.test(value);
    const hasUpperCaseLetter = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    const isPasswordValid = hasNonAlphabeticalCharacters && hasUpperCaseLetter && hasNumber;

    return isPasswordValid ? null : { passwordComplexity: true };
  }
}
