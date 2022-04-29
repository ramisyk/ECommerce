import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClientService: HttpClientService) { }

  createProduct(product:Create_Product, successCallBack?: any){
    this._httpClientService.post({
      controller: "products"
    },product).subscribe(result => {
      successCallBack();
      alert("Başarılı");
    });
  }
}
