import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(public fb: FormBuilder) {}

  mapConfiguration: any[] = [];
  form: FormGroup = new FormGroup({
    cluster: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+.?d{0,3}$'),
    ]),
    geoRefrence: new FormControl(true),
    timeBuffer: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+.?d{0,3}$'),
    ]),
    locationBuffer: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+.?d{0,3}$'),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+.?d{0,3}$'),
    ]),
    // mapTypes: this.fb.array(['Feature', 'Basemap']),
    mapTypes: new FormControl(''),
  });

  getMapTypesControl() {
    return this.form.get('mapTypes') as FormArray;
  }
  initializeFormGroup(): void {
    this.form.setValue({
      cluster: '',
      geoRefrence: true,
      timeBuffer: '',
      locationBuffer: '',
      duration: '',
      mapTypes:'' ,
      mapSubTypes: 0,
    });
  }

  // get data from api goes here
  getMapConfiguration(): any[] {
    return [...this.mapConfiguration];
  }

  addMapConfiguration(configuration: any): void {
    this.mapConfiguration.push({
      cluster: configuration.cluster,
      geoRefrence: configuration.geoRefrence,
      timeBuffer: configuration.timeBuffer,
      locationBuffer: configuration.locationBuffer,
      duration: configuration.duration,
      mapTypes: configuration.mapTypes,
      mapSubTypes: configuration.mapSubTypes,
    });
  }

  updateMapConfiguartion(configuration: any): void {
    // update api goes here
  }
  deleteMapConfiguartion(id: number): void {
    // update api goes here
  }
}
