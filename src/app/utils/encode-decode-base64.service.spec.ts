import { TestBed } from '@angular/core/testing';

import { EncodeDecodeBase64Service } from './encode-decode-base64.service';

describe('EncodeDecodeBase64Service', () => {
  let service: EncodeDecodeBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodeDecodeBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
