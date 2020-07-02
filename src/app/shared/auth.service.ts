import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { combineLatest, Observable, of } from 'rxjs';
import { User } from './user.interface';
import { catchError, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../persistence/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected static USER_TOKEN = 'userId';
  private readonly currentUserId$: Observable<
    string | undefined
  > = this.localStorageService.getItem(AuthService.USER_TOKEN);
  private readonly currentUser$: Observable<User | undefined> = combineLatest([
    this.currentUserId$,
    this.userService.getUsers(),
  ]).pipe(
    map(([userId, users]) =>
      users.find(({ id }: User) => id.toString() === userId)
    ),
    distinctUntilChanged((userA, userB) => userA?.id === userB?.id)
  );

  constructor(
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService
  ) {}

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUser$;
  }

  login(usernameAttempt: string): Observable<boolean> {
    return this.userService.getUsers().pipe(
      map((users) =>
        users.find(({ username }: User) => username === usernameAttempt)
      ),
      tap(({ id }: User | undefined) =>
        this.localStorageService.setItem(AuthService.USER_TOKEN, `${id}`)
      ),
      map((user: User | undefined) => !!user),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.localStorageService.removeItem(AuthService.USER_TOKEN);
  }
}
