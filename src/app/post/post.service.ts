import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from './post.interface';
import { catchError, map, take, tap } from 'rxjs/operators';
import { NotificationsService } from '../shared/notifications.service';
import { WindowObject } from '../window-object';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly posts$: BehaviorSubject<Post[]> = new BehaviorSubject<
    Post[]
  >([]);
  private readonly backendPosts$: Observable<Post[]> = this.httpClient
    .get<Post[]>('/api/posts')
    .pipe(tap((posts) => this.posts$.next(posts)));

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(WindowObject) private readonly windowObject: Window,
    private readonly notificationsService: NotificationsService
  ) {}

  getPosts(): Observable<Post[]> {
    if (!this.posts$.getValue().length) {
      return this.backendPosts$;
    }
    return this.posts$;
  }

  getPost(postId: number): Observable<Post> {
    return this.getPosts().pipe(
      map((posts: Post[]) => posts.find(({ id }) => id === postId))
    );
  }

  updatePost({ title, body, id: postId }: Post): Observable<Post[]> {
    return this.getPosts().pipe(
      take(1),
      map((posts: Post[]) =>
        posts.map(({ id, ...args }) =>
          id === postId ? { id, ...args, title, body } : { id, ...args }
        )
      ),
      tap((posts) => this.posts$.next(posts)),
      tap(() =>
        this.notificationsService.addMessage(
          `Post "${title}" updated!`,
          'You can always remove or update it (until you\'ll close the page)',
          'info'
        )
      )
    );
  }

  createPost(post: Post): Observable<Post[]> {
    return this.getPosts().pipe(
      take(1),
      map((posts: Post[]) =>
        [].concat({ ...post, id: posts.length + 1 }).concat(posts)
      ),
      tap((posts) => this.posts$.next(posts)),
      tap(() =>
        this.notificationsService.addMessage(
          `Post "${post.title}" created!`,
          'You can always remove or update it (until you\'ll close the page)',
          'success'
        )
      )
    );
  }

  deletePost(postId: number): Observable<boolean> {
    if (
      !this.windowObject.confirm('Are you sure you want to delete this post?')
    ) {
      return of();
    }
    return this.getPosts().pipe(
      take(1),
      map((posts: Post[]) => posts.filter(({ id }) => id !== postId)),
      tap((posts) => this.posts$.next(posts)),
      map(() => true),
      catchError(() => of(false)),
      tap(() =>
        this.notificationsService.addMessage(
          `Post #${postId} removed!`,
          '',
          'danger'
        )
      )
    );
  }
}
