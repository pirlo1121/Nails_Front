import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTalleresComponent } from './banner-talleres.component';

describe('BannerTalleresComponent', () => {
  let component: BannerTalleresComponent;
  let fixture: ComponentFixture<BannerTalleresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerTalleresComponent]
    });
    fixture = TestBed.createComponent(BannerTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
