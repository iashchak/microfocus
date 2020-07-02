import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.interface';
import { AuthService } from '../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  const currentUser = new BehaviorSubject<User | undefined>(undefined);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => currentUser.asObservable(),
          },
        },
      ],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
