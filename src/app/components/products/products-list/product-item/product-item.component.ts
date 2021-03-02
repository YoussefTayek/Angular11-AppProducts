import { EventDrivenService } from './../../../../state/event.driven.service';
import { Product } from '../../../model/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  //@Output() productEmitter= new EventEmitter();
  constructor(private eventDrivenService: EventDrivenService) { }

  ngOnInit(): void {
  }
  onSelect(p){
  // this.productEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p});
   this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT,payload:p})
  }

  onDelete(p){
    //this.productEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT,payload:p})
  }

  onEdit(p){
    //this.productEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT,payload:p})
  }
  
}
