import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebannerComponent } from './managebanner.component';

describe('ManagebannerComponent', () => {
  let component: ManagebannerComponent;
  let fixture: ComponentFixture<ManagebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
