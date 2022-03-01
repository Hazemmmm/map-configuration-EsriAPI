
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
import { EsriMapService } from '../../services/esri-map.service';

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
  private _basemap = 'arcgis-streets';
  private _loaded = false;
  private _WFS!: esri.FeatureLayer;
  private _map!: esri.Map;
  private _mapViewProperties!: esri.MapViewProperties;
  private _view!: esri.MapView;
  private _mapProperties!: esri.MapProperties;
  featuresArr: esri.Graphic[] = [];
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

  constructor(private mapService: EsriMapService) {}

  ngOnInit() {
    this.initializeMap().then((m) => {
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, FeatureLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
      ]);

      this._mapProperties = {
        basemap: this._basemap,
      };

      this._map = new EsriMap(this._mapProperties);
      this._mapViewProperties = {
        container: this.arcMapRef.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: this._map,
      };

      this._view = new EsriMapView(this._mapViewProperties);
      await this._view.when();
      this._WFS = new FeatureLayer({
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessmentStatePlane/MapServer/0',
        outFields: ['*'],
      });
      this._map.add(this._WFS);
      this.setMapViewToFeatureLayerExtent(this._WFS);
      this.getAllFeatures(this._WFS);
    } catch (error) {
      console.log(`Basemap can't be loaded due to this error: ${error}`);
    }
  }

  getAllFeatures(WFS: esri.FeatureLayer): void {
    WFS.queryFeatures().then((res) => {
      res.features?.forEach((feature) => {
        this.featuresArr.push(feature.attributes);
      });
    this.mapService.featuresData$.next(this.featuresArr);
    });
  }
  setMapViewToFeatureLayerExtent(WFS: esri.FeatureLayer): void {
    WFS.queryExtent().then((res) => this._view.goTo(res.extent));
  }
}
