import { TestBed } from '@angular/core/testing';

import { ViewPortStateService } from './view-port-state.service';

describe('ViewPortStateService', () => {
  let service: ViewPortStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPortStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
