import { TestBed } from '@angular/core/testing';

import { UserCheckGuard } from './user-check.guard';

describe('UserCheckGuard', () => {
  let guard: UserCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
