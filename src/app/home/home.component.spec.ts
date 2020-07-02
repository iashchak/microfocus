import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../shared/user.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from '../post/post.interface';
import { Title } from '@angular/platform-browser';
import { FeatureToggleService } from '../shared/feature-toggle.service';
import { AuthService } from '../shared/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const resolveData = new BehaviorSubject({
    posts: {
      posts: [],
      total: 0,
    },
    users: [],
  });
  const queryParams = new BehaviorSubject<{ page: undefined | number }>({
    page: undefined,
  });
  const currentUser = new BehaviorSubject<User | undefined>(undefined);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: resolveData.asObservable(),
            queryParams: queryParams.asObservable(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => currentUser.asObservable(),
          },
        },
        {
          provide: Title,
          useValue: {
            setTitle: () => {},
            getTitle: () => '',
          },
        },
        {
          provide: FeatureToggleService,
          useValue: {
            getItem: () => of(''),
            setItem: () => {},
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getUser', () => {
    it('should find user in existsing list', () => {
      const post: Post = {
        id: 2,
        userId: 2,
        title: '',
        body: '',
      };
      const users: User[] = [
        {
          id: 1,
          username: 'test1',
        },
        {
          id: 2,
          username: 'test2',
        },
      ] as User[];
      const result: User | undefined = component.getUser(post, users);
      expect(result).toBeDefined();
      expect(result.username).toBe(users[1].username);
    });
  });
  it('shouldn\'t find user', () => {
    const post: Post = {
      id: 2,
      userId: 2,
      title: '',
      body: '',
    };
    const users: User[] = [
      {
        id: 1,
        username: 'test1',
      },
    ] as User[];
    const result: User | undefined = component.getUser(post, users);
    expect(result).toBeUndefined();
  });
});
