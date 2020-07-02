import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject, of } from 'rxjs';
import { User } from './shared/user.interface';
import { AuthService } from './shared/auth.service';
import { LocalStorageService } from './persistence/local-storage.service';
import { WindowObject } from './window-object';

describe('AppComponent', () => {
  const currentUser = new BehaviorSubject<User | undefined>(undefined);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => currentUser.asObservable(),
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            getItem: () => of(''),
          },
        },
        {
          provide: WindowObject,
          useValue: window,
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
