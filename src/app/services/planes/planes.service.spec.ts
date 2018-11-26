import { TestBed, inject } from '@angular/core/testing';

import { PlanesService } from './planes.service';

describe('PlanesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanesService]
    });
  });

  it('should be created', inject([PlanesService], (service: PlanesService) => {
    expect(service).toBeTruthy();
  }));
});
