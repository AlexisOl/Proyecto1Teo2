import { TestBed } from '@angular/core/testing';

import { LoginServicioService } from './login-servicio.service';

describe('LoginServicioService', () => {
  let service: LoginServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
