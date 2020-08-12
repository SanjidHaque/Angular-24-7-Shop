"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataStorageService = void 0;
var core_1 = require("@angular/core");
var ProductDataStorageService = /** @class */ (function () {
    function ProductDataStorageService(httpClient) {
        this.httpClient = httpClient;
        this.backEndPort = '50706';
        this.rootUrl = 'http://localhost:' + this.backEndPort;
    }
    ProductDataStorageService.prototype.getAllProduct = function () {
        return this.httpClient.get(this.rootUrl + '/api/GetAllProduct');
    };
    ProductDataStorageService.prototype.addProduct = function (product) {
        return this.httpClient.post(this.rootUrl + '/api/AddProduct', product);
    };
    ProductDataStorageService.prototype.editProduct = function (product) {
        return this.httpClient.put(this.rootUrl + '/api/EditProduct', product);
    };
    ProductDataStorageService.prototype.deleteProduct = function (productId) {
        return this.httpClient.delete(this.rootUrl + '/api/DeleteProduct' + "/" + productId);
    };
    ProductDataStorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductDataStorageService);
    return ProductDataStorageService;
}());
exports.ProductDataStorageService = ProductDataStorageService;
