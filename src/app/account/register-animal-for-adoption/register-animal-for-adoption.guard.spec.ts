import { TestBed } from '@angular/core/testing';

import { RegisterAnimalForAdoptionGuard } from './register-animal-for-adoption.guard';

describe('RegisterAnimalForAdoptionGuard', () => {
  let guard: RegisterAnimalForAdoptionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisterAnimalForAdoptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
