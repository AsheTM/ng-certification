import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'capitalCase'
})
export class CapitalCasePipe implements PipeTransform {

  transform(value: string): string {
    return value[0].toUpperCase() + value.substr(1).toLocaleLowerCase();
  }

}
