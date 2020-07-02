import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface FeaturesRegistry {
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  private readonly config$ = new BehaviorSubject<FeaturesRegistry>({});

  constructor() {}

  setItem(itemName: string, itemValue: unknown): void {
    const currentValues = this.config$.getValue();
    this.config$.next({ ...currentValues, [itemName]: itemValue });
  }

  getItem(itemName: string): Observable<unknown> {
    return this.config$.pipe(pluck(itemName));
  }
}
