import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from '../../../models/product.model';


@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})
export class ProductInventoryComponent implements OnInit {
  products: Product[] = [];
  @Input() product;

  constructor() { }

  ngOnInit() {
    this.products[0] = this.product;
  }

}
