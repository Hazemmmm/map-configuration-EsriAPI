import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriBasemapComponent } from './modules/basemap/component/esri-basemap/esri-basemap.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriBasemapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
