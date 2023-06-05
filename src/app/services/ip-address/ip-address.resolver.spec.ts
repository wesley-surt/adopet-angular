import { TestBed } from '@angular/core/testing';

import { IpAddressResolver } from './ip-address.resolver';

describe('IpAddressResolver', () => {
  let resolver: IpAddressResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IpAddressResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
