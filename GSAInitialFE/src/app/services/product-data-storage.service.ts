import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataStorageService {
  backEndPort = '44384';
  rootUrl = 'https://localhost:' + this.backEndPort;

  constructor(private httpClient: HttpClient) { }

  getAllProduct() {
    return this.httpClient.get<Product[]>(this.rootUrl + '/api/GetAllProduct');
  }

  addNewProduct(product: Product) {
    return this.httpClient.post<Product>(this.rootUrl + '/api/AddNewProduct', product);
  }

  editProduct(product: Product) {
    return this.httpClient.put<Product>(this.rootUrl + '/api/EditProduct', product);
  }

  deleteProduct(productId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteProduct'}/${productId}`);
  }
}
