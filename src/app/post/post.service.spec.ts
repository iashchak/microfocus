import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from './post.interface';
import { HttpClient } from '@angular/common/http';
import { WindowObject } from '../window-object';

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: WindowObject,
          useValue: window,
        },
      ],
    });
    service = TestBed.inject(PostService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getPosts', () => {
    it('should all posts and make request only once', () => {
      const postCount: Post[] = [{ id: 1 }] as Post[];
      service.getPosts().subscribe((data) => expect(data).toEqual(postCount));
      const req = httpTestingController.expectOne('/api/posts');
      expect(req.request.method).toEqual('GET');
      req.flush(postCount);
    });
  });
  describe('createPost', () => {
    it('should all posts and make request only once', () => {
      const postCount: Post[] = [] as Post[];
      service
        .createPost({ id: 1 } as Post)
        .subscribe((data) => expect(data).toEqual([{ id: 1 }] as Post[]));
      const req = httpTestingController.expectOne('/api/posts');
      expect(req.request.method).toEqual('GET');
      req.flush(postCount);
    });
  });
});
