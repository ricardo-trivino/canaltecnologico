import { TestBed } from '@angular/core/testing';

import { ServicioTecnologicoService } from './servicio-tecnologico.service';

describe('ServicioTecnologicoService', () => {
  let service: ServicioTecnologicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTecnologicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
