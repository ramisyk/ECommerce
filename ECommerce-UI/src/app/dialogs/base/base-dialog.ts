import { MatDialogRef } from '@angular/material/dialog';

export class BaseDialog<DialogComponent> {
  constructor(private dialogRef: MatDialogRef<DialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
