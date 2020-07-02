import { TestBed } from '@angular/core/testing';

import { AuthorGuard } from './author.guard';
import { AuthService } from '../shared/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from './post.service';
import { Post } from './post.interface';

describe('AuthorGuard', () => {
  let guard: AuthorGuard;

  const currentUser = new BehaviorSubject<User | undefined>(undefined);
  const posts$ = new BehaviorSubject<Post[]>([]);
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
        {
          provide: PostService,
          useValue: {
            getPosts: () => posts$.asObservable(),
          },
        },
      ],
    });
    guard = TestBed.inject(AuthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
