import { TestBed, inject } from '@angular/core/testing';

import { ReverseGeocoderService } from './reverse-geocoder.service';

describe('ReverseGeocoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseGeocoderService]
    });
  });

  it('should be created', inject([ReverseGeocoderService], (service: ReverseGeocoderService) => {
    expect(service).toBeTruthy();
  }));
});
