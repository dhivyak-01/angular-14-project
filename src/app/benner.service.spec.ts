import { TestBed } from '@angular/core/testing';

import { BennerService } from './benner.service';

describe('BennerService', () => {
  let service: BennerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BennerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
