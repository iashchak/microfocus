import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, flatMap, map, pluck, take, tap } from 'rxjs/operators';
import { Post } from './post.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { User } from '../shared/user.interface';
import { AuthService } from '../shared/auth.service';
import { Title } from '@angular/platform-browser';
import { FeatureToggleService } from '../shared/feature-toggle.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  readonly sourceData: Observable<
    Post | undefined
  > = this.activatedRoute.data.pipe(pluck('originalPost'));
  readonly notChanged$ = new BehaviorSubject(true);
  readonly postId$: Observable<
    number | undefined
  > = this.activatedRoute.params.pipe(
    pluck('postId'),
    map((postId: string) => parseInt(postId, 10)),
    map((postId: number) => (isNaN(postId) ? undefined : postId))
  );
  readonly isEdit$: Observable<boolean> = this.activatedRoute.params.pipe(
    pluck('postId'),
    map((post) => !!post)
  );
  readonly currentUserId$: Observable<
    number
  > = this.authService.getCurrentUser().pipe(map(({ id }: User) => id));
  public postForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(2000),
    ]),
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly featureToggleRegistry: FeatureToggleService,
    private readonly titleService: Title
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  handleSubmission(): void {
    this.isEdit$
      .pipe(
        take(1),
        tap((isEdit) => {
          if (isEdit) {
            this.updatePost();
          } else {
            this.createPost();
          }
        })
      )
      .subscribe();
  }

  createPost(): void {
    const { title, message } = this.postForm.getRawValue();
    this.currentUserId$
      .pipe(
        take(1),
        flatMap((userId) =>
          this.postService.createPost({ title, body: message, userId })
        ),
        tap(() => this.notChanged$.next(true)),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
  }

  updatePost(): void {
    const { title, message } = this.postForm.getRawValue();
    combineLatest([this.currentUserId$, this.postId$])
      .pipe(
        take(1),
        flatMap(([userId, postId]) =>
          this.postService.updatePost({
            id: postId,
            body: message,
            title,
            userId,
          })
        ),
        tap(() => this.notChanged$.next(true)),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
  }

  askForDelete(): void {
    this.postId$
      .pipe(
        take(1),
        flatMap((id) => this.postService.deletePost(id)),
        tap(() => this.notChanged$.next(true)),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
  }

  resetForm(): void {
    this.sourceData
      .pipe(
        take(1),
        tap((originalPost) => {
          if (originalPost) {
            this.titleService.setTitle('Edit post');
          } else {
            this.titleService.setTitle('New post');
          }
          this.featureToggleRegistry.setItem('showUserInfo', true);
          this.featureToggleRegistry.setItem('showToHomeButton', true);
        }),
        tap((originalPost) => {
          this.postForm.reset({
            title: originalPost?.title || '',
            message: originalPost?.body || '',
          });
        }),
        tap(() => {
          this.notChanged$.next(true);
        })
      )
      .subscribe();
  }

  updateChangeState(): void {
    this.sourceData
      .pipe(
        take(1),
        map((post: Post | undefined) => {
          return post || { title: '', body: '' };
        }),
        map((postA) => {
          const postB = this.postForm
            ? this.postForm.getRawValue()
            : { title: '', body: '' };
          return postA?.title === postB?.title && postA?.body === postB?.body;
        }),
        tap((state) => {
          this.notChanged$.next(state);
        })
      )
      .subscribe();
  }
}
