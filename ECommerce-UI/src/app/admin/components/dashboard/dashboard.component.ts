import { Component, OnInit } from '@angular/core';
import { AlertifyService, AlertifyMessagePosition, AlertifyMessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _alertifyService: AlertifyService) { }

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