import { TestBed } from '@angular/core/testing';

import { MenuItemsRestService } from './menu-items-rest.service';

describe('MenuItemsRestService', () => {
  let service: MenuItemsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
