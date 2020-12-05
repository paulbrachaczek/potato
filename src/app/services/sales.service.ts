import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Sales, ColumnEntity, DataEntity } from '../models/sales';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private column = new BehaviorSubject<null|(ColumnEntity)[]>(null);
  private data = new BehaviorSubject<string|(DataEntity)[]>(null);
  public columnNodes = this.column.asObservable();
  public salesData = this.data.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  private requestSales() {

    return this.httpClient.get('../../assets/data/potato_sales.json').subscribe(
      (request: Sales) => {
        this.column.next(request.column);
        this.data.next(request.data);
      }
    );
  }

  getSales() {
    this.requestSales();
  }

  addProduct(_prod: Product) {
    const {productName, productID} = _prod;
    let oldProducts;
    this.salesData.subscribe((old) => {
      oldProducts = old;
    });

    this.data.next([
      ...oldProducts,
      {
        productID,
        productName,
        "salesQ1": 0,
        "salesQ2": 0,
        "salesQ3": 0,
        "salesQ4": 0
      }
    ]);

    this.router.navigate(['/sales']);

  }
}
