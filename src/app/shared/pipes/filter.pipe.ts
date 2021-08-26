import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: string[], value: string, key?: string | number): string[] {
    return data.filter((item: unknown) => {
        let itm: string = String((key !== undefined && key !== null) ? item[key] : item);
        
        return !value 
          || itm.toLowerCase()
            .includes(value.toLowerCase());
      });
  }

}
