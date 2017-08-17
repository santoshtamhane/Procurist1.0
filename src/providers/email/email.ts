import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
/*
  Generated class for the EmailProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor() {
    console.log('Hello EmailProvider Provider');
  }
static isValid(control: FormControl){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };

  }
}
