import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import esri = __esri;
@Injectable({
  providedIn: 'root',
})
export class EsriMapService {
  featuresData$ = new Subject<esri.Graphic[]>();

  constructor() {}
}
