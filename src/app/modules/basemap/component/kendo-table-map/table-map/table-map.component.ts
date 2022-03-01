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

  onFilter(inputValue: any): void {
    console.log(inputValue);

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }




}
