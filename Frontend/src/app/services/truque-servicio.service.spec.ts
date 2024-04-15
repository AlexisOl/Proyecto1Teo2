import { TestBed } from '@angular/core/testing';

import { TruqueServicioService } from './truque-servicio.service';

describe('TruqueServicioService', () => {
  let service: TruqueServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruqueServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
