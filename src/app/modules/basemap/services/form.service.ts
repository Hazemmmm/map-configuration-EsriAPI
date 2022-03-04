import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  form: FormGroup = new FormGroup({
    cluster: new FormControl('', Validators.required),
    geoRefrence: new FormControl(true),
    timeBuffer: new FormControl('', Validators.required),
    locationBuffer: new FormControl('',Validators.required),
    duration: new FormControl('', Validators.required),
    mapTypes: new FormControl(0),
    mapSubTypes: new FormControl(0),
  });


  initializeFormGroup(): void{
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

}
