import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapScreenComponent } from './map-screen.component';

describe('MapScreenComponent', () => {
  let component: MapScreenComponent;
  let fixture: ComponentFixture<MapScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
