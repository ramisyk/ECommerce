import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list-product';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit  {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinner: NgxSpinnerService, private _productService: ProductService, private _alertifyService: AlertifyService) { super(spinner); }
  
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: List_Product[] = await this._productService.read(
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
      },
      (errorMessage) => {
        this._alertifyService.message("Hata verdi", {
          dismissOthers: true,
          messageType: AlertifyMessageType.Error,
          messagePosition: AlertifyMessagePosition.TopRight
        });
      });
    this.dataSource = new MatTableDataSource<List_Product>(allProducts);
    this.dataSource.paginator = this.paginator;

  }
}
