import { TestBed } from '@angular/core/testing';

import { ManageHrService } from './manage-hr.service';

describe('ManageHrService', () => {
  let service: ManageHrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageHrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
