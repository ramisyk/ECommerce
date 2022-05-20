import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  AlertifyService,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  constructor(
    private _httpClientService: HttpClientService,
    private _alertifyService: AlertifyService,
    private _toastrService: CustomToastrService,
    private dialog: MatDialog,
    private _element: ElementRef,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState,
      afterClosed: () => {
        const td: HTMLTableCellElement = this._element.nativeElement;
      
        this._httpClientService
        .post(
          {
            controller: this.options.controller,
            action: this.options.action,
            queryString: this.options.queryString,
            headers: new HttpHeaders({ responseType: 'blob' }),
          },
          fileData
        )
        .subscribe(
          (data) => {
            const message: string = 'Dosyalar Başarıyla Yüklendi';
            if (this.options.isAdminPage) {
              this._alertifyService.message(message, {
                dismissOthers: true,
                messageType: AlertifyMessageType.Success,
                messagePosition: AlertifyMessagePosition.TopRight,
              });
            } else {
              this._toastrService.message(message, 'Success', {
                messageType: ToastrMessageType.Success,
                messagePosition: ToastrMessagePosition.TopRight,
              });
            }
            console.log(fileData);
          },
          (errorResponse: HttpErrorResponse) => {
            const message: string =
              'Dosyalar Yüklenirken Bir Problemle Karşılaşıldı';
            if (this.options.isAdminPage) {
              this._alertifyService.message(message, {
                dismissOthers: true,
                messageType: AlertifyMessageType.Error,
                messagePosition: AlertifyMessagePosition.TopRight,
              });
            } else {
              this._toastrService.message(message, 'Error', {
                messageType: ToastrMessageType.Error,
                messagePosition: ToastrMessagePosition.TopRight,
              });
            }
          }
        );
      }
    })

    // this.openDialog(async () => {
    //   const td: HTMLTableCellElement = this._element.nativeElement;
    
    //   this._httpClientService
    //   .post(
    //     {
    //       controller: this.options.controller,
    //       action: this.options.action,
    //       queryString: this.options.queryString,
    //       headers: new HttpHeaders({ responseType: 'blob' }),
    //     },
    //     fileData
    //   )
    //   .subscribe(
    //     (data) => {
    //       const message: string = 'Dosyalar Başarıyla Yüklendi';
    //       if (this.options.isAdminPage) {
    //         this._alertifyService.message(message, {
    //           dismissOthers: true,
    //           messageType: AlertifyMessageType.Success,
    //           messagePosition: AlertifyMessagePosition.TopRight,
    //         });
    //       } else {
    //         this._toastrService.message(message, 'Success', {
    //           messageType: ToastrMessageType.Success,
    //           messagePosition: ToastrMessagePosition.TopRight,
    //         });
    //       }
    //       console.log(fileData);
    //     },
    //     (errorResponse: HttpErrorResponse) => {
    //       const message: string =
    //         'Dosyalar Yüklenirken Bir Problemle Karşılaşıldı';
    //       if (this.options.isAdminPage) {
    //         this._alertifyService.message(message, {
    //           dismissOthers: true,
    //           messageType: AlertifyMessageType.Error,
    //           messagePosition: AlertifyMessagePosition.TopRight,
    //         });
    //       } else {
    //         this._toastrService.message(message, 'Error', {
    //           messageType: ToastrMessageType.Error,
    //           messagePosition: ToastrMessagePosition.TopRight,
    //         });
    //       }
    //     }
    //   );
    // })
    
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == FileUploadDialogState.Yes) afterClosed();
  //   });
  // }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
