import { TestBed } from '@angular/core/testing';

import { AuthenticationResolver } from './authentication.resolver';

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthenticationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
