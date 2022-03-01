import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import esri = __esri;
@Injectable({
  providedIn: 'root',
})
export class EsriMapService {
  featuresData$ = new BehaviorSubject<esri.Graphic[]>([]);
  filterQuery$ = new BehaviorSubject<string>('');

  constructor() {}
}
