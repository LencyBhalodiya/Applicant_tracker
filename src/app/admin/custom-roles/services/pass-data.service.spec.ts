import { TestBed } from '@angular/core/testing';

import { PassDataService } from './pass-data.service';

describe('PassDataService', () => {
  let service: PassDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
