import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Title } from '@angular/platform-browser';
import { FeatureToggleService } from '../shared/feature-toggle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly isInvalid$ = new BehaviorSubject<boolean>(false);
  readonly loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly featureToggleRegistry: FeatureToggleService
  ) {
    featureToggleRegistry.setItem('showUserInfo', false);
    featureToggleRegistry.setItem('showToHomeButton', false);
    titleService.setTitle('Login');
  }

  change(): void {
    this.isInvalid$.next(false);
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.username)
      .pipe(take(1))
      .subscribe(async (isSuccess) => {
        if (isSuccess) {
          await this.router.navigate(['/']);
        } else {
          this.isInvalid$.next(true);
        }
      });
  }
}
