import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@shopping-app-ui/store';

@Pipe({
  name: 'filtered'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], filterString: string) {
    if (value.length === 0) {
      return value;
    }

    if (filterString === null) {
      console.log('No data entered');
    }

    const lists = [];
    for (const list of value) {
       if ( list.productName?.toLowerCase().includes(filterString?.toLowerCase())){
        lists.push(list)
      }
    }

    return lists;
  }
}
