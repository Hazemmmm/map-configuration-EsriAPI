import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  mapConfiguration: any[] = [];
  form: FormGroup = new FormGroup({
    cluster: new FormControl('',Validators.required),
    geoRefrence: new FormControl(true),
    timeBuffer: new FormControl('', Validators.required),
    locationBuffer: new FormControl('', Validators.required ),
    duration: new FormControl('',  Validators.required),
    mapTypes: new FormControl(0),
    mapSubTypes: new FormControl(0),
  });

  initializeFormGroup(): void {
    this.form.setValue({
      cluster: '',
      geoRefrence: true,
      timeBuffer: '',
      locationBuffer: '',
      duration: '',
      mapTypes: 0,
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
