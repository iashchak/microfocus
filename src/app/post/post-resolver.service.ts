import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from './post.interface';
import { Observable, of } from 'rxjs';
import { PostService } from './post.service';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostResolverService implements Resolve<Post | undefined> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post | undefined> {
    if (!route.paramMap.has('postId')) {
      return of(undefined);
    }
    const postId = parseInt(route.paramMap.get('postId'), 10);
    return this.postService.getPost(postId).pipe(take(1));
  }
}
