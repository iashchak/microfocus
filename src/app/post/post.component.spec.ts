import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './post.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../shared/user.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../shared/auth.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  const resolveData = new BehaviorSubject({
    originalPost: undefined,
  });
  const paramsData = new BehaviorSubject({
    postId: 1,
  });
  const currentUser = new BehaviorSubject<User | undefined>({ id: 1 } as User);
  const mockedUserService = {
    getCurrentUser: () => currentUser.asObservable(),
    logout: (): void => undefined,
  };
  const mockedPostService = {
    createPost: () => of(null),
    deletePost: () => of(null),
    updatePost: () => of(null),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: resolveData,
            params: paramsData,
          },
        },
        {
          provide: AuthService,
          useValue: mockedUserService,
        },
        {
          provide: PostService,
          useValue: mockedPostService,
        },
      ],
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createPost', () => {
    it('should create post', () => {
      const postFormRawDataSpy = spyOn(
        component.postForm,
        'getRawValue'
      ).and.returnValue({ title: '', message: '' });
      const postServiceCreatePostSpy = spyOn(
        mockedPostService,
        'createPost'
      ).and.returnValue(of(null));
      component.createPost();
      expect(postFormRawDataSpy).toHaveBeenCalledTimes(1);
      expect(postServiceCreatePostSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('updatePost', () => {
    it('should update post', async () => {
      const postFormRawDataSpy = spyOn(
        component.postForm,
        'getRawValue'
      ).and.returnValue({ title: '', message: '' });
      const postServiceCreatePostSpy = spyOn(
        mockedPostService,
        'updatePost'
      ).and.returnValue(of(null));
      component.updatePost();
      await fixture.detectChanges();
      expect(postFormRawDataSpy).toHaveBeenCalledTimes(1);
      expect(postServiceCreatePostSpy).toHaveBeenCalledTimes(1);
    });
  });
});
