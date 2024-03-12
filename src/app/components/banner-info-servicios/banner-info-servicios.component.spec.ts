import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInfoServiciosComponent } from './banner-info-servicios.component';

describe('BannerInfoServiciosComponent', () => {
  let component: BannerInfoServiciosComponent;
  let fixture: ComponentFixture<BannerInfoServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerInfoServiciosComponent]
    });
    fixture = TestBed.createComponent(BannerInfoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
