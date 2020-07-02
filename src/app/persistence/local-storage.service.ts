import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowObject } from '../window-object';

@Injectable()
export class LocalStorageService {
  constructor(
    @Inject(LocalStorage) protected readonly storage: Storage,
    @Inject(WindowObject) protected readonly windowObject: Window
  ) {}

  private itemSources: Map<string, BehaviorSubject<string>> = new Map();

  public addListener(): void {
    this.windowObject.addEventListener('storage', this.reactOnStorageUpdates);
  }

  public removeListener(): void {
    this.windowObject.removeEventListener(
      'storage',
      this.reactOnStorageUpdates
    );
  }

  reactOnStorageUpdates({ key, newValue }: StorageEvent): void {
    if (key && this.itemSources.has(key)) {
      this.itemSources.get(key).next(newValue);
    }
  }

  getItem(key: string): Observable<string> {
    if (!this.itemSources.has(key)) {
      this.itemSources.set(
        key,
        new BehaviorSubject<string>(this.storage.getItem(key))
      );
    }

    return this.itemSources.get(key).asObservable();
  }

  setItem(key: string, value: string): void {
    try {
      this.storage.setItem(key, value);
      if (this.itemSources.has(key)) {
        this.itemSources.get(key).next(this.storage.getItem(key));
      }
    } catch (error) {
      this.itemSources.get(key).error(error);
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);

    if (this.itemSources.has(key)) {
      this.itemSources.get(key).next(this.storage.getItem(key)); // Expect to be null
      this.itemSources.delete(key);
    }
  }

  clear(): void {
    this.storage.clear();
    this.itemSources.forEach((itemSource: BehaviorSubject<string>) => {
      itemSource.next(null);
      itemSource.complete();
    });

    this.itemSources.clear();
  }
}
