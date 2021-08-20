import { TestBed } from '@angular/core/testing';

import { FirebaseautenticacionService } from './firebaseautenticacion.service';

describe('FirebaseautenticacionService', () => {
  let service: FirebaseautenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseautenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
