import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageTypes, messagePosition: MessagePositions, delay: number = 3, dismissOthers: boolean = false) {
  message(message: string, options:Partial<AlertifyOptions>) {
    alertify.set('notifier','position', options.messagePosition);
    alertify.set('notifier','delay', options.delay);
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers)
      msg.dismissOthers(); 
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  messagePosition: AlertifyMessagePosition = AlertifyMessagePosition.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum AlertifyMessagePosition {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}