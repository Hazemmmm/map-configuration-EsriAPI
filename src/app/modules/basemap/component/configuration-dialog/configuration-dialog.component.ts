import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-dialog',
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.css'],
})
export class ConfigurationDialogComponent implements OnInit {
  public opened = false;

  public close(status:any) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  ngOnInit():void {}
}
