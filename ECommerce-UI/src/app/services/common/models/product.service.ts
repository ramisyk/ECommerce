import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create-product';
import { List_Product } from 'src/app/contracts/list-product';
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
      });
  }
  
  async read(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product[]> {
    const promiseData: Promise<List_Product[]> = this._httpClientService.get<List_Product[]>({
      controller: "products"
    }).toPromise();

    promiseData.then(data => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

      return await promiseData;
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