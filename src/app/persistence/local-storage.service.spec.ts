import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalStorage } from './local-storage';
import { WindowObject } from '../window-object';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorage, useValue: window.localStorage },
        { provide: WindowObject, useValue: window },
        LocalStorageService,
      ],
    }).compileComponents();
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
