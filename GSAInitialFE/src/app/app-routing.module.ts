import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {ProductsResolverService} from './route-resolvers/products-resolver.service';
import {ProductListComponent} from './components/product-list/product-list.component';


const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
    resolve: { products: ProductsResolverService }
  },
  {
    path : '',
    redirectTo: '/product-list',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
