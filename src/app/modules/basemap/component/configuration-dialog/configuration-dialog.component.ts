import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';



import { ErrorStateMatcher } from '@angular/material/core';import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MapTypes } from '../../models/MapTypes';
import { FormService } from '../../services/form.service';
@Component({
  selector: 'app-configuration-dialog',
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.css'],
})
export class ConfigurationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formService: FormService,
    public dialogRef: MatDialogRef<ConfigurationDialogComponent>,
    private notificationService: NotificationService
  ) {}
  matcher = new MyErrorStateMatcher();
  mapType = new FormControl();
  inputPattern = '^d+.?d{0,3}$';
  mapTypes: MapTypes[] = [
    {
      id: 1,
      name: 'Feature',
      subType: ['Dynamic', 'cached'],
    },
    {
      id: 2,
      name: 'Basemap',
      subType: ['Imagery', 'Topographic'],
    },
  ];
  ngOnInit(): void {
    this.formService.getMapConfiguration();
  }

  onSubmit(): void {
    if (this.formService.form.valid) {
      this.formService.addMapConfiguration(this.formService.form.value);
      this.notificationService.onSucess('Submitted Sucessfully!');
    } else {
      this.formService.updateMapConfiguartion(this.formService.form.value);
      this.formService.form.reset();
      this.formService.initializeFormGroup();
      this.notificationService.warn('Will be reset?!');
      this.onClose();
    }
  }
  onReset(): void {
    this.formService.form.reset();
    // this.formService.initializeFormGroup();
  }

  onClose(): void {
    this.formService.form.reset();
    this.formService.initializeFormGroup();
    this.dialogRef.close();
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}



