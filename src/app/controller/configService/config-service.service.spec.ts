import { TestBed } from '@angular/core/testing';

import { ConfigServiceService } from './language-service';

describe('ConfigServiceService', () => {
  let service: ConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
