import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from './post.interface';
import { Observable } from 'rxjs';
import { PostService } from './post.service';
import { map, take } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class PostsResolverService
  implements Resolve<{ posts: Post[]; total: number }> {
  constructor(private readonly postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ posts: Post[]; total: number }> {
    const pageFromUrl = parseInt(route.queryParamMap.get('page'), 10);
    const page = isNaN(pageFromUrl) ? 1 : pageFromUrl;
    return this.postService.getPosts().pipe(
      take(1),
      map((posts) => ({
        posts: posts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
        total: posts.length,
      }))
    );
  }
}
