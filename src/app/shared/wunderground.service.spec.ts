import { TestBed, inject } from '@angular/core/testing';

import { WundergroundService } from './wunderground.service';

describe('WundergroundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WundergroundService]
    });
  });

  it('should be created', inject([WundergroundService], (service: WundergroundService) => {
    expect(service).toBeTruthy();
  }));
});
