import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLoadMoreComponent } from './btn-load-more.component';

describe('BtnLoadMoreComponent', () => {
  let component: BtnLoadMoreComponent;
  let fixture: ComponentFixture<BtnLoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnLoadMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnLoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
