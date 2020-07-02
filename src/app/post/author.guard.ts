import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { map, pluck, tap } from 'rxjs/operators';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly postService: PostService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const postId = parseInt(next.paramMap.get('postId'), 10);
    if (isNaN(postId)) {
      return of(false);
    }
    const userId$ = this.authService.getCurrentUser().pipe(pluck('id'));
    const userIdInPost$ = this.postService
      .getPost(postId)
      .pipe(pluck('userId'));
    return combineLatest([userId$, userIdInPost$]).pipe(
      map(([id, userId]) => id === userId),
      tap((isAuthor) => {
        if (!isAuthor) {
          return this.router.navigate(['/']);
        }
      })
    );
  }
}
