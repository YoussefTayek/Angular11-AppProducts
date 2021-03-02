import { EventDrivenService } from './../../state/event.driven.service';
import { Product } from './../model/product.model';
import { ActionEvent, DataStateEnum, ProductActionsTypes } from './../../state/product.state';
import { Observable, of } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith, catchError } from 'rxjs/operators';
import { APPDataState } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<APPDataState<Product[]>>;
  readonly DataStateEnum= DataStateEnum;


  constructor(private eventDrivenService: EventDrivenService ,private productsService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent) => {
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
          map(data=> ({ dataState: DataStateEnum.LOADED, data: data })),
          startWith({ dataState: DataStateEnum.LOADING }),
          catchError(err=>of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }  

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
          map(data=> ({ dataState: DataStateEnum.LOADED, data: data })),
          startWith({ dataState: DataStateEnum.LOADING }),
          catchError(err=>of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }  

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
          map(data=> ({ dataState: DataStateEnum.LOADED, data: data })),
          startWith({ dataState: DataStateEnum.LOADING }),
          catchError(err=>of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }  

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=> ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err=>of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(p) {
    
    this.productsService.selectProduct(p).subscribe(product => {
      console.log(product.selected);
    })
  }

  onDelete(p) {
    if(confirm('Are you sure to delete this product?')) {
      this.productsService.deleteProduct(p)
      .subscribe(data => {
        this.onGetAllProducts();
      })
    }
  }

  onEdit(p) {
    this.router.navigateByUrl('/editProduct/'+p.id);
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }
 

  onActionEvent($event:ActionEvent) {
    switch($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts;break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct();break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
    }
  }
}
