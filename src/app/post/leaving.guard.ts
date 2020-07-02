import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PostComponent } from './post.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeavingGuard implements CanDeactivate<PostComponent> {
  canDeactivate(
    component: PostComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> {
    return component.notChanged$.pipe(
      map(
        (notChanged) =>
          notChanged || window.confirm('Do you really want to cancel?')
      )
    );
  }
}
