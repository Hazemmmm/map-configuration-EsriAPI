import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriBasemapComponent } from './modules/basemap/component/esri-basemap/esri-basemap.component';
import { TableMapComponent } from './modules/basemap/component/kendo-table-map/table-map/table-map.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';





@NgModule({
  declarations: [AppComponent, EsriBasemapComponent, TableMapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
  ],
  providers: [DistributionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
