import { TestBed } from '@angular/core/testing';

import { UsersResolverService } from './users-resolver.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.interface';
import { UserService } from './user.service';

describe('UsersResolverService', () => {
  let service: UsersResolverService;

  const users$ = new BehaviorSubject<User[]>([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: () => users$.asObservable(),
          },
        },
      ],
    });
    service = TestBed.inject(UsersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
