import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostsResolverService } from '../post/posts-resolver.service';
import { UsersResolverService } from '../shared/users-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      posts: PostsResolverService,
      users: UsersResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
