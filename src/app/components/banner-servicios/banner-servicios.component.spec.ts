import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerServiciosComponent } from './banner-servicios.component';

describe('BannerServiciosComponent', () => {
  let component: BannerServiciosComponent;
  let fixture: ComponentFixture<BannerServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerServiciosComponent]
    });
    fixture = TestBed.createComponent(BannerServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
