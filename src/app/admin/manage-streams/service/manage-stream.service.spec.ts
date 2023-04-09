import { TestBed } from '@angular/core/testing';

import { ManageStreamService } from './manage-stream.service';

describe('ManageStreamService', () => {
  let service: ManageStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
