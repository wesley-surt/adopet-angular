import { TestBed } from '@angular/core/testing';

import { LocalityStateResolver } from './locality-state.resolver';

describe('LocalityStateResolver', () => {
  let resolver: LocalityStateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocalityStateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
