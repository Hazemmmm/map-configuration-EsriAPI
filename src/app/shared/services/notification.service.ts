import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  onSucess(message: any) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(message);
  }
  warn(message: any) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(message, '', this.config);
  }
}
