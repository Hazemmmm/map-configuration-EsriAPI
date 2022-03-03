import { Component, OnInit, ViewChild } from "@angular/core";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { EsriMapService } from "../../../services/esri-map.service";
import {
  DialogService,
  DialogRef,
  DialogCloseResult,
} from '@progress/kendo-angular-dialog';
import esri = __esri;
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialogComponent } from "../../configuration-dialog/configuration-dialog.component";
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
  public result: any;
  constructor(
    private mapService: EsriMapService,
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {}

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

  handleMapConfiguration(): void {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure?',
      actions: [{ text: 'No' }, { text: 'Yes', themeColor: 'primary' }],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        console.log('action', result);
      }

      this.result = JSON.stringify(result);
    });
  }

  openDialog(): void {
    this.dialog.open(ConfigurationDialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}
