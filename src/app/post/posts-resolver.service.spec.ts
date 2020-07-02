import { TestBed } from '@angular/core/testing';

import { PostsResolverService } from './posts-resolver.service';
import { PostService } from './post.service';
import { BehaviorSubject } from 'rxjs';
import { Post } from './post.interface';

describe('PostsResolverService', () => {
  let service: PostsResolverService;
  const posts$ = new BehaviorSubject<Post[]>([]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PostService,
          useValue: {
            getPosts: () => posts$.asObservable(),
          },
        },
      ],
    });
    service = TestBed.inject(PostsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
