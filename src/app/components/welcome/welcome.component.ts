import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  constructor(
    private salesService: SalesService
    ) { }

  ngOnInit(): void {
    this.salesService.getSales();
  }
}
