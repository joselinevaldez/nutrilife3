import { TestBed, inject } from '@angular/core/testing';

import { PlatillosService } from './platillos.service';

describe('PlatillosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatillosService]
    });
  });

  it('should be created', inject([PlatillosService], (service: PlatillosService) => {
    expect(service).toBeTruthy();
  }));
});
