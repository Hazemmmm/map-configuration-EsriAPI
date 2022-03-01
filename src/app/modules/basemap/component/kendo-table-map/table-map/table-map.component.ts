import { Component, OnInit, ViewChild } from "@angular/core";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { EsriMapService } from "../../../services/esri-map.service";

import esri = __esri;

@Component({
  selector: 'app-table-map',
  templateUrl: './table-map.component.html',
  styleUrls: ['./table-map.component.css'],
})
export class TableMapComponent implements OnInit {
  @ViewChild(DataBindingDirective)
  dataBinding!: DataBindingDirective;
  public gridData: esri.Graphic[] = [];
  public gridView: esri.Graphic[] = [];
  public mySelection: string[] = [];

  constructor(private mapService: EsriMapService) {}

  public ngOnInit(): void {
    this.setGridData();
  }

  setGridData(): void {
    this.mapService.featuresData$.subscribe((features) => {
      this.gridData = features;
      this.gridView = this.gridData;
    });
  }

  onClick(event: string): void {
    this.mapService.filterQuery$.next(event);
  }

  onFilter(inputValue: any): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'objectid',
            operator: 'contains',
            value: inputValue.value.toString(),
          },
          {
            field: 'incidentnm',
            operator: 'contains',
            value: inputValue.value,
          },
          {
            field: 'inspdate',
            operator: 'contains',
            value: inputValue.value,
          },
          {
            field: 'firstname',
            operator: 'contains',
            value: inputValue.value,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

}
