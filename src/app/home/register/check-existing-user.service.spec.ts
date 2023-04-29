import { TestBed } from '@angular/core/testing';

import { CheckExistingUserService } from './check-existing-user.service';

describe('CheckExistingUserService', () => {
  let service: CheckExistingUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckExistingUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
