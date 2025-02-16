import { TestBed } from '@angular/core/testing';

import { WindRefServiceService } from './wind-ref.service.service';

describe('WindRefServiceService', () => {
  let service: WindRefServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindRefServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
