import { TestBed } from '@angular/core/testing';

import { LeavingGuard } from './leaving.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('LeavingGuard', () => {
  let guard: LeavingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(LeavingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
