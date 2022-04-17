import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyService, AlertifyMessagePosition, AlertifyMessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private _alertifyService: AlertifyService, spinner: NgxSpinnerService) { 
    super(spinner)

  }

  ngOnInit(): void {
  }
  
  message(){
    this._alertifyService.message("test", {
      messageType: AlertifyMessageType.Success,
      delay: 5,
      messagePosition: AlertifyMessagePosition.TopCenter,
      dismissOthers: false
    });
  }

  dismissAll(){
    this._alertifyService.dismissAll();
  }
}