import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Product} from '../../models/product.model';
import {MatDialog} from '@angular/material/dialog';
import {ProductDataStorageService} from '../../services/product-data-storage.service';
import {AddUpdateDialogComponent} from '../../dialogs/add-update-dialog/add-update-dialog.component';
import {orderBy, process, SortDescriptor, State} from '@progress/kendo-data-query';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  multiple = false;
  allowUnsort = true;

  gridData: GridDataResult;
  sort: SortDescriptor[] = [];

  state: State = {
    skip: 0,
    take: 5
  };

  products: Product[] = [];

  constructor(private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private matDialog: MatDialog,
              private productDataStorageService: ProductDataStorageService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.products = data['products'].products;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.gridData = {
      data: orderBy(this.products, this.sort),
      total: this.products.length
    };
    this.gridData = process(this.products, this.state);
  }

  sortChange(sort: SortDescriptor[]) {
    this.sort = sort;
    this.loadProducts();
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.gridData = process(this.products, this.state);
  }

  addProduct() {
    this.matDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data: {
          header: 'Add New Product',
          confirmationStatus: false,
          name: '',
          category: ''
        }
      }).afterClosed().subscribe((result: any) => {
      if (result.confirmationStatus) {

        this.productDataStorageService.addNewProduct(result.product)
          .subscribe((data: any) => {

            result.product.Id = data.id;
            this.products.push(result.product);
            this.gridData.data.push(result.product);
            this.loadProducts();

            this.snackBar.open('New Product Added!', '', {
              duration: 3000,
              horizontalPosition: 'center'
            });

          });
      }
    });
  }

  editProduct(product: Product) {
    this.matDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data: {
          header: 'Edit Product',
          confirmationStatus: false,
          name: product.Name,
          price: product.Price,
          quantity: product.Quantity
        }
      }).afterClosed().subscribe((result: any) => {

      if (result.confirmationStatus) {

        result.product.Id = product.Id;
        this.productDataStorageService.editProduct(result.product)
          .subscribe((response: any) => {

            product.Name = result.product.Name;
            product.Price = result.product.Price;
            product.Quantity = result.product.Quantity;

            this.snackBar.open('Product updated!', '', {
              duration: 3000,
              horizontalPosition: 'center'
            });

          });
      }
    });
  }

  deleteProduct(productId: number) {
    const index = this.products.findIndex(x => x.Id === productId);

    this.productDataStorageService.deleteProduct(productId)
      .subscribe((response: any) => {

        this.products.splice(index, 1);
        this.gridData.data.splice(index, 1);
        this.snackBar.open('Product deleted!', '', {
          duration: 3000,
          horizontalPosition: 'center'
        });

      });
  }
}
