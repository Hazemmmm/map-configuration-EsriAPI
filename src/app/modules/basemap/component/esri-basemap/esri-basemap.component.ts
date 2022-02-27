
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-esri-basemap',
  templateUrl: './esri-basemap.component.html',
  styleUrls: ['./esri-basemap.component.css'],
})
export class EsriBasemapComponent implements OnInit {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  @ViewChild('mapViewNode', { static: false })
  private arcMapRef!: ElementRef;
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = 'streets';
  private _loaded = false;
 _view!: esri.MapView;

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {}

  async initializeMap() {
    try {

      const [EsriMap, EsriMapView] = (await loadModules([
        'esri/Map',
        'esri/views/MapView',
      ])) as [esri.MapConstructor, esri.MapViewConstructor];

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);
      const mapViewProperties: esri.MapViewProperties = {
        container: this.arcMapRef.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
      };

      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      // return this._view;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  ngOnInit() {
    this.initializeMap().then((m) => {
      console.log('mapView ready: ', this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

}
