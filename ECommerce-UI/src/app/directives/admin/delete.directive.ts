import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    // public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private productService: ProductService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/images/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(_element.nativeElement, img);
  }
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClicked() {
    this.spinner.show(SpinnerType.BallAtom)
    const td: HTMLTableCellElement = this._element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(500, () => {
      this.callback.emit();
    });
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes)
  //       afterClosed();
  //   });
  // }

}
