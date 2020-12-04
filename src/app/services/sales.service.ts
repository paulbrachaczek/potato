import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Sales, ColumnEntity, DataEntity } from '../models/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private sales: Observable<DataEntity[]>;
  private column = new BehaviorSubject<null|(ColumnEntity)[]>(null);
  private data = new BehaviorSubject<string|(DataEntity)[]>(null);
  public columnNodes = this.column.asObservable();
  public salesData = this.data.asObservable();

  constructor(private httpClient: HttpClient) { }

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
}
