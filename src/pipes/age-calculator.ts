import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the AgeCalculator pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'ageCalculator'
})
@Injectable()
export class AgeCalculator implements PipeTransform{
  /*
    Takes a value and makes it lowercase.
   */
  transform(value) {
    let birthday = new Date( value ).getTime();
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
