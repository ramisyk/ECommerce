import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this._httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }
      );
  }
}

/*
, (errorResponse: HttpErrorResponse) => {
  const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
  let message = "";
  _error.forEach((v, index) => {
    v.value.forEach((_v, _index) => {
      message += `${_v}<br>`;
    });
  });
  console.log("Bir takım hatalar");
  console.log(message);
  // errorCallBack(message);
}
*/