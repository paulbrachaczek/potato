import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { ColumnEntity, SubHeadersEntity } from '../../models/sales';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {
  subscription$: Subscription;
  subscription2$: Subscription;
  loading = true;
  sales = [];
  column: ColumnEntity[];
  total: number[];
  searchName: string;
  subHeaders: SubHeadersEntity[];


  constructor(
    private salesService: SalesService
    ) { }

  ngOnInit(): void {
    //this.salesService.getSales();
    this.subscription$ = this.salesService.columnNodes.subscribe((column) => {
      this.column = column;
      if(column) {
        this.subHeaders = column[2].subHeaders;
      }
    });
    this.subscription2$ = this.salesService.salesData.subscribe((sales) => {
      //this.sales = sales;
      if(sales) {
        this.calculateTotal(sales);
      }
    });
  }

  ngOnDestroy() {
    console.log('distroy')
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  calculateTotal(_sales) {
    const sales = _sales;
    const total = [];

    total.push(
      sales.map(sale => Object.values(sale)
      .filter(value => typeof(value) === 'number')
      .reduce((acc: number, value: number) => acc + value))
    );

    total.flat().forEach( (item, i) => {
      this.sales.push(
        {
          ...sales[i],
          'total': item
        }
      );
    });
    this.loading = false;
  }

}
