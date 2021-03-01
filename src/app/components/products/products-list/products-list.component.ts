import { Product } from './../../model/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionEvent, APPDataState, ProductActionsTypes } from 'src/app/state/product.state';
import { Observable } from 'rxjs';
import { DataStateEnum } from './../../../state/product.state';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() data$:Observable<APPDataState<Product[]>>;
  @Output() stateEmitter:EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum= DataStateEnum;
  constructor() {}

  ngOnInit(): void {
  }

  onEdit(p: Product) {
    this.stateEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p});
  }
  onDelete(p: Product) {
    this.stateEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p});
  }
  onSelect(p: Product) {
    this.stateEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p});
  }

  onActionEvent($event:ActionEvent) {
    this.stateEmitter.emit($event);
  }
}