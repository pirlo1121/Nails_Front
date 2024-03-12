import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceComponent } from './new-service.component';

describe('NewserviceComponent', () => {
  let component: NewServiceComponent;
  let fixture: ComponentFixture<NewServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewServiceComponent]
    });
    fixture = TestBed.createComponent(NewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
