import { TestBed } from '@angular/core/testing';

import { GetallOrdersService } from './getall-orders.service';

describe('GetallOrdersService', () => {
  let service: GetallOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetallOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
