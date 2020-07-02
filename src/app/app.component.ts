import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FeatureToggleService } from './shared/feature-toggle.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { WindowObject } from './window-object';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  MessageId,
  NotificationsService,
} from './shared/notifications.service';
import { AuthService } from './shared/auth.service';
import { LocalStorageService } from './persistence/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly showSpinner$ = new BehaviorSubject<boolean>(true);
  private readonly isDestroyed$ = new Subject();

  public readonly showToHomeButton$ = this.featureToggleRegistry.getItem(
    'showToHomeButton'
  );
  public readonly showUserInfo$ = this.featureToggleRegistry.getItem(
    'showUserInfo'
  );
  public readonly currentUser$ = this.authService.getCurrentUser();
  public readonly messages$ = this.notificationsService.getMessages();

  get pageTitle(): string {
    return this.titleService.getTitle();
  }

  constructor(
    private readonly titleService: Title,
    private readonly featureToggleRegistry: FeatureToggleService,
    private readonly notificationsService: NotificationsService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    @Inject(WindowObject) private readonly windowObject: Window
  ) {}

  scrollOnNavigation(): void {
    this.router.events
      .pipe(
        takeUntil(this.isDestroyed$),
        filter((event) => !(event instanceof NavigationEnd)),
        tap(() => {
          this.windowObject.scrollTo({ top: 0, behavior: 'smooth' });
        })
      )
      .subscribe();
  }

  showSpinnerOnNavigation(): void {
    this.router.events
      .pipe(
        takeUntil(this.isDestroyed$),
        tap((event) => {
          if (event instanceof NavigationStart) {
            this.showSpinner$.next(true);
          } else if (event instanceof NavigationEnd) {
            this.showSpinner$.next(false);
          } else if (event instanceof NavigationCancel) {
            this.showSpinner$.next(false);
          } else if (event instanceof NavigationError) {
            this.showSpinner$.next(false);
          }
        })
      )
      .subscribe();
    this.showSpinner$
      .pipe(
        takeUntil(this.isDestroyed$),
        debounceTime(500),
        tap((showElement) => this.updateElement(showElement))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.scrollOnNavigation();
    this.showSpinnerOnNavigation();
    this.localStorageService.addListener();
  }

  /**
   * Toggle the spinner state (placed outside of angular)
   */
  updateElement(showElement: boolean): void {
    const classList: DOMTokenList = document
      .getElementsByClassName('loader')
      .item(0).classList;
    if (showElement) {
      classList.add('loader--present');
    } else {
      classList.remove('loader--present');
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(undefined);
    this.localStorageService.removeListener();
  }

  logout(): void {
    this.authService.logout();
  }

  removeMessage(messageId: MessageId): void {
    this.notificationsService.removeMessage(messageId);
  }

  removeAllMessages(): void {
    this.notificationsService.removeAll();
  }
}
