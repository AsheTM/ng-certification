import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string, substr: string = ''): SafeHtml {
    if(!substr) {
      return value;
    }

    const htmlBoldedValue:  string 
      = value.replace(new RegExp(substr, 'ig'), (substr: string) => `<strong>${substr}</strong>`);
    
    return this._sanitizer.bypassSecurityTrustHtml(htmlBoldedValue);
  }

}
