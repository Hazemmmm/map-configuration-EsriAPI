
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
import { environment } from 'src/environments/environment';
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
  private _basemap = 'satellite';
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

  ngOnInit(): void {
    this.initializeMap()
      .then((m) => {
        this._loaded = this._view.ready;
        this.mapLoadedEvent.emit(true);
      })
      .catch((err) => console.error(err));
  }

  async initializeMap(): Promise<void> {
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
        url: environment.WFS_Url,
        outFields: ['*'],
      });
      this._map.add(this._WFS);
      this.setMapViewToFeatureLayerExtent(this._WFS);
      this.getAllFeatures(this._WFS);
      this.handleSelectedFeature(this._view);
    } catch (error) {
      console.log(`Basemap can't be loaded due to this error: ${error}`);
    }
  }

  handleSelectedFeature(view: esri.MapView): void {
    this.mapService.filterQuery$.subscribe((query: string) => {
      let highlightSelect: esri.Handle;
      view.whenLayerView(this._WFS).then((layerView) => {
        const queryFeature = this._WFS.createQuery();
        queryFeature.where = `objectid='${query}'`;
        this._WFS.queryFeatures(queryFeature).then((res) => {
          if (highlightSelect) {
            highlightSelect.remove();
          }
          const feature: esri.Graphic = res.features[0];
          highlightSelect = layerView.highlight(feature.attributes['OBJECTID']);

          view.goTo(
            {
              target: feature.geometry,
              zoom: 22,
            },
            {
              duration: 2000,
              easing: 'ease-in-out',
            }
          );
        });
      });
    });
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
