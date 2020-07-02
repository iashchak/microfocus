import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../post/post.interface';
import { map, pluck } from 'rxjs/operators';
import { User } from '../shared/user.interface';
import { ITEMS_PER_PAGE } from '../app.constants';
import { AuthService } from '../shared/auth.service';
import { Title } from '@angular/platform-browser';
import { FeatureToggleService } from '../shared/feature-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly posts$: Observable<Post[]> = this.activatedRoute.data.pipe(
    pluck('posts'),
    pluck('posts')
  );
  readonly total$: Observable<number> = this.activatedRoute.data.pipe(
    pluck('posts'),
    pluck('total')
  );
  readonly users$: Observable<User[]> = this.activatedRoute.data.pipe(
    pluck('users')
  );
  readonly currentUser$: Observable<User> = this.authService.getCurrentUser();
  readonly page$: Observable<number> = this.activatedRoute.queryParams.pipe(
    map(({ page }) => parseInt(page, 10)),
    map((page: number) => (isNaN(page) ? 1 : page))
  );
  readonly ITEMS_PER_PAGE = ITEMS_PER_PAGE;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly titleService: Title,
    private readonly featureToggleRegistry: FeatureToggleService
  ) {
    featureToggleRegistry.setItem('showUserInfo', true);
    featureToggleRegistry.setItem('showToHomeButton', false);
    titleService.setTitle('Home');
  }

  getUser({ userId }: Post, users: User[]): User | undefined {
    return users.find(({ id }) => id === userId);
  }
}
