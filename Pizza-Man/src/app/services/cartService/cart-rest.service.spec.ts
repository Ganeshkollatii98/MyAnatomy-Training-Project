import { TestBed } from '@angular/core/testing';

import { CartRestService } from './cart-rest.service';

describe('CartRestService', () => {
  let service: CartRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
