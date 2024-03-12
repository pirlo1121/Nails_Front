import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTiendaComponent } from './banner-tienda.component';

describe('BannerTiendaComponent', () => {
  let component: BannerTiendaComponent;
  let fixture: ComponentFixture<BannerTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerTiendaComponent]
    });
    fixture = TestBed.createComponent(BannerTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
