import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { PostResolverService } from './post-resolver.service';
import { AuthorGuard } from './author.guard';
import { LoggedInGuard } from './logged-in.guard';
import { LeavingGuard } from './leaving.guard';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    canActivate: [LoggedInGuard],
    canDeactivate: [LeavingGuard],
    resolve: {
      originalPost: PostResolverService,
    },
  },
  {
    path: ':postId',
    component: PostComponent,
    canActivate: [LoggedInGuard, AuthorGuard],
    canDeactivate: [LeavingGuard],
    resolve: {
      originalPost: PostResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
