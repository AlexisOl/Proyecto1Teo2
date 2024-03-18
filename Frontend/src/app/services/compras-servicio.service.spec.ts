import { TestBed } from '@angular/core/testing';

import { ComprasServicioService } from './compras-servicio.service';

describe('ComprasServicioService', () => {
  let service: ComprasServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
