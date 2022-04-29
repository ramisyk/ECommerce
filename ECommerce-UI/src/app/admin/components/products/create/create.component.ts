import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create-product';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(
    spiner: NgxSpinnerService,
    private alrtify: AlertifyService,
    private _productService: ProductService
    ) {
      super(spiner);
     }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);

    const createProduct: Create_Product = new Create_Product();
    createProduct.name = name.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this._productService.createProduct(createProduct, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alrtify.message("Ürün başarı ile eklendi!", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        messagePosition: AlertifyMessagePosition.BottomRight
      });
    });
  }

}
