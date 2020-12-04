import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sales'
})
export class SalesPipe implements PipeTransform {

  transform(items: any, searchName: string): any {
    if(!items) {
      return [];
    }
    if(!searchName) {
      return items;
    }

    if(searchName) {
      return items.filter(item => {
        return item.productName.toLowerCase().includes(searchName);
      });
    }
  }
}
