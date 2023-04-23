import { TestBed } from '@angular/core/testing';

import { ManageApplicantService } from './manage-applicant.service';

describe('ManageApplicantService', () => {
  let service: ManageApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
