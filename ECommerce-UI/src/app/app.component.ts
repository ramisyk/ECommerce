import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerce-UI';

  /**
   *
   */
  constructor(private toasterService: CustomToastrService) {
    toasterService.message("Merhaba", "Ramis", { messageType: ToastrMessageType.Success, messagePosition: ToastrMessagePosition.BottomLeft });
    toasterService.message("Merhaba", "Ramis", { messageType: ToastrMessageType.Error, messagePosition: ToastrMessagePosition.BottomRight });
    toasterService.message("Merhaba", "Ramis", { messageType: ToastrMessageType.Warning, messagePosition: ToastrMessagePosition.TopLeft });
    toasterService.message("Merhaba", "Ramis", { messageType: ToastrMessageType.Info, messagePosition: ToastrMessagePosition.TopRight });
  }


}


