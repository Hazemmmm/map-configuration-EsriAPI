import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriBasemapComponent } from './modules/basemap/component/esri-basemap/esri-basemap.component';
import { TableMapComponent } from './modules/basemap/component/kendo-table-map/table-map/table-map.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from '@angular/common/http';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ConfigurationDialogComponent } from './modules/basemap/component/configuration-dialog/configuration-dialog.component';
import { MaterialModule } from './shared/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    EsriBasemapComponent,
    TableMapComponent,
    ConfigurationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule,
    GridModule,
    DialogsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
