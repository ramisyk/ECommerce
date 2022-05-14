import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>
  
  constructor(
    private _httpClientService: HttpClientService,
    private _alertifyService: AlertifyService,
    private _toastrService: CustomToastrService
  ) { }

  ngOnInit(): void {
  }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, _file.webkitRelativePath);
      });
    }

    this._httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => { 
      console.log(fileData)
      const message: string = "Files uploaded successfully"
      if (this.options.isAdminPage) {
        this._alertifyService.message(
          message,{
            dismissOthers: true,
            messageType: AlertifyMessageType.Success,
            messagePosition: AlertifyMessagePosition.TopRight
          }
        )
      }
      else {
        this._toastrService.message(
          message, 'Success',
          {
            messageType: ToastrMessageType.Success,
            messagePosition: ToastrMessagePosition.TopRight
          }
        )
      }
    },
      (errorResponse: HttpErrorResponse) => {
        const message: string = "Files can not uploaded"
      if (this.options.isAdminPage) {
        this._alertifyService.message(
          message,{
            dismissOthers: true,
            messageType: AlertifyMessageType.Error,
            messagePosition: AlertifyMessagePosition.TopRight
          }
        )
      }
      else {
        this._toastrService.message(
          message, 'Error',
          {
            messageType: ToastrMessageType.Error,
            messagePosition: ToastrMessagePosition.TopRight
          }
        )
      }
       })

  }

  }


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}