import { TestBed } from '@angular/core/testing';

import { FormularioContactoService } from './formulario-contacto.service';

describe('FormularioContactoService', () => {
  let service: FormularioContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
