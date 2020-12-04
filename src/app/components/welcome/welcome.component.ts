import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { SalesService } from '../../services/sales.service';
import { DataEntity, ColumnEntity } from '../../models/sales';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loading = false;
  users: User[];
  sales: DataEntity[]|string;
  column: ColumnEntity[];
  total: number[];

  constructor(
    private userService: UserService,
    private salesService: SalesService
    ) { }

  ngOnInit(): void {
    // this.loading = true;
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //       this.loading = false;
    //       this.users = users;
    // });
    this.salesService.getSales();
    this.salesService.columnNodes.subscribe((column) => {
      this.column = column;
    });
    this.salesService.salesData.subscribe((sales) => {
      this.sales = sales;
      if(this.sales) {
        this.total = this.calculateTotal(this.sales);
        console.log(this.total);
      }
    });
  }

  calculateTotal(_sales): number[] {
    const sales = _sales;
    let total = [];

    total.push(
      sales.map(sale => Object.values(sale)
      .filter(value => typeof(value) === 'number')
      .reduce((acc: number, value: number) => acc + value))
    );

    return total.flat();
  }
}
