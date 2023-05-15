import { TestBed } from '@angular/core/testing';

import { IbgeLocalityUfService } from './ibge-locality-uf.service';

describe('IbgeLocalityUfService', () => {
  let service: IbgeLocalityUfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbgeLocalityUfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
