import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const loginMethodResult = new BehaviorSubject<boolean>(false);
  const mockedUserService = {
    login: () => loginMethodResult.asObservable(),
  };
  const router = {
    navigate: (...args) => Promise.resolve(),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockedUserService,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  describe('change', () => {
    it('should reset invalidity indicator', () => {
      component.isInvalid$.next(true);
      expect(component.isInvalid$.getValue()).toBeTrue();
      component.change();
      expect(component.isInvalid$.getValue()).toBeFalse();
    });
  });
  describe('login', () => {
    it('should call login service and navigate', () => {
      component.loginForm.value.username = 'login';
      const loginSpy = spyOn(mockedUserService, 'login').and.returnValue(
        of(true)
      );
      const navigateSpy = spyOn(router, 'navigate');
      component.login();
      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
    it('should call login service and throw an error', () => {
      component.loginForm.value.username = 'login';
      const loginSpy = spyOn(mockedUserService, 'login').and.returnValue(
        of(false)
      );
      const navigateSpy = spyOn(router, 'navigate');
      const errorObject = spyOn(component.isInvalid$, 'next');
      component.login();
      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(errorObject).toHaveBeenCalledWith(true);
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
