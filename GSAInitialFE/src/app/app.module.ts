import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AddUpdateDialogComponent} from './dialogs/add-update-dialog/add-update-dialog.component';
import {AngularMaterialModule} from './modules/angular-material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductsResolverService} from './route-resolvers/products-resolver.service';
import {ProductDataStorageService} from './services/product-data-storage.service';
import {KendoUiModule} from './modules/kendo-ui.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddUpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    KendoUiModule
  ],
  providers: [ProductDataStorageService, ProductsResolverService],
  entryComponents: [AddUpdateDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
