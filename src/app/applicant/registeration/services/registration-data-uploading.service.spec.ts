import { TestBed } from '@angular/core/testing';

import { RegistrationDataUploadingService } from './registration-data-uploading.service';

describe('RegistrationDataUploadingService', () => {
  let service: RegistrationDataUploadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationDataUploadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
