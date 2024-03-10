import { TestBed } from '@angular/core/testing';

import { VentasServicioService } from './ventas-servicio.service';

describe('VentasServicioService', () => {
  let service: VentasServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
