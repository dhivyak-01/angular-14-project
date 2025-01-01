import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantactComponent } from './cantact.component';

describe('CantactComponent', () => {
  let component: CantactComponent;
  let fixture: ComponentFixture<CantactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
