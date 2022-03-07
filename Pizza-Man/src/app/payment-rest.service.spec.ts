import { TestBed } from '@angular/core/testing';

import { PaymentRestService } from './payment-rest.service';

describe('PaymentRestService', () => {
  let service: PaymentRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
