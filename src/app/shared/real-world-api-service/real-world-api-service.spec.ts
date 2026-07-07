import { TestBed } from '@angular/core/testing';

import { RealWorldApiService } from './real-world-api-service';

describe('RealWorldApiService', () => {
  let service: RealWorldApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealWorldApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
