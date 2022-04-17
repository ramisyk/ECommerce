import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessagePositions, MessageTypes } from 'src/app/services/admin/alertify.service';

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
      messageType: MessageTypes.Success,
      delay: 5,
      messagePosition: MessagePositions.TopCenter,
      dismissOthers: false
    });
  }

  dismissAll(){
    this._alertifyService.dismissAll();
  }
}
