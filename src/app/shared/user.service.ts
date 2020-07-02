import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly backendUsers$: Observable<User[]> = this.httpClient
    .get<User[]>('/api/users')
    .pipe(debounceTime(1000));

  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.backendUsers$;
  }
}
