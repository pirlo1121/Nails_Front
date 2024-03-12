import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyAuthGuard } from './verify-auth.guard';

describe('verifyAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifyAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
