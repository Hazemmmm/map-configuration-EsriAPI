import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsriBasemapComponent } from './esri-basemap.component';

describe('EsriBasemapComponent', () => {
  let component: EsriBasemapComponent;
  let fixture: ComponentFixture<EsriBasemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsriBasemapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriBasemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
