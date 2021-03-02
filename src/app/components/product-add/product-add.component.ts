import { EventDrivenService } from './../../state/event.driven.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductActionsTypes } from 'src/app/state/product.state';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  submitted: boolean=false;

  constructor(private productsService: ProductService, private fb: FormBuilder,
              private router: Router, private eventDrivenService: EventDrivenService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]
    })
  }
  onAddProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productsService.addProduct(this.productFormGroup.value)
    .subscribe(p=>{
      this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED});
      this.router.navigateByUrl('/products');
    });
    }
}
