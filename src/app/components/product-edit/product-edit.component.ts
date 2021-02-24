import { ProductService } from './../../services/product.service';
import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productFormGroup: FormGroup;
  submitted: boolean=false;
  idProduct: number;
  constructor(private route: ActivatedRoute, private productService: ProductService, 
              private fb:FormBuilder, private router: Router) {
    this.idProduct = this.route.snapshot.params[('id')];
  }

  
  ngOnInit(): void {
    this.productService.getProduct(this.idProduct).subscribe(produit => {
    
      this.productFormGroup = this.fb.group({
        id:[produit.id],
        name:[produit.name, Validators.required],
        price:[produit.price, Validators.required],
        quantity:[produit.quantity, Validators.required],
        selected:[produit.selected, Validators.required],
        available:[produit.available, Validators.required]
      })
         })
  }

  onUpdateProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productService.updateProduct(this.productFormGroup.value)
    .subscribe(p=>{
      this.router.navigateByUrl('/products');
    });
    }
  }

