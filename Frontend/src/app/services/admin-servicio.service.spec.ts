import { TestBed } from '@angular/core/testing';

import { AdminServicioService } from './admin-servicio.service';

describe('AdminServicioService', () => {
  let service: AdminServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
