import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { SalesService } from '../../services/sales.service';
import { DataEntity, ColumnEntity } from '../../models/sales';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
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
    this.salesService.getSales();
  }
}
