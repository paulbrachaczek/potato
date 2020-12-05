import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  loading = false;
  submitted = false;
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]],
      productID: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern(/^-?(|[1-9]{13}\d*)?$/)]],
      manager: ['', Validators.maxLength(30)],
      date: ['', Validators.required]
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit(productData): void {
    this.submitted = true;

    if (this.productForm.invalid) {
        return;
    }
    this.loading = true;
    this.productForm.reset();
    this.salesService.addProduct(productData);
  }

}
