import { TestBed } from '@angular/core/testing';

import { VoluntariadoServicioService } from './voluntariado-servicio.service';

describe('VoluntariadoServicioService', () => {
  let service: VoluntariadoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoluntariadoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
