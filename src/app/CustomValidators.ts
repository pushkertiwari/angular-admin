import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    static ValidateUrl(control: AbstractControl) {
      if (!control.value.startsWith('https') || !control.value.includes('.com')) {
        return { validUrl: true };
      }
      return null;
  }
}
