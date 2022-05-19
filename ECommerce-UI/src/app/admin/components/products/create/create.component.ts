import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create-product';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(
    spiner: NgxSpinnerService,
    private alertify: AlertifyService,
    private _productService: ProductService
    ) {
      super(spiner);
     }

  ngOnInit(): void {
  }
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "select",
    isAdminPage: true,

  }
  
  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    //kontroller burada yeniden yapılacak (reactive form entegre edilecek)

    this._productService.createProduct(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        messagePosition: AlertifyMessagePosition.TopRight
      });
      this.createdProduct.emit(create_product);
    }, (errorMessage) => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: AlertifyMessageType.Error,
          messagePosition: AlertifyMessagePosition.TopRight
        });
    });
  }
}