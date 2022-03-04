import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';



import { ErrorStateMatcher } from '@angular/material/core';import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
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
    private notificationService: NotificationService,
    public fb: FormBuilder
  ) {}
  matcher = new MyErrorStateMatcher();
  mapType = new FormControl([]);
  inputPattern = '^d+.?d{0,3}$';
  // mapTypes!: any[];
  // mapTypesArr = this.fb.array(['Feature', 'Basemap'])
  mapTypes: string[] = ['Feature', 'Basemap'];
  featureSubTypes: string[] = ['Dynamic', 'cached'];
  basemapSubTypes: string[] = ['Imagery', 'Topographic'];

  isFeature!: boolean;

  ngOnInit(): void {
    // this.mapTypes = this.formService.getMapTypesControl().value;
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
  selected(event: any) {
    let flag =
      event.value === this.mapTypes[0]
        ? (this.isFeature = true)
        : (this.isFeature = false);
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



