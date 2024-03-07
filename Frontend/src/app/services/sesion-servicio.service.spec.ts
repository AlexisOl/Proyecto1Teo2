import { TestBed } from '@angular/core/testing';

import { SesionServicioService } from './sesion-servicio.service';

describe('SesionServicioService', () => {
  let service: SesionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
