import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then(({ HomeModule }) => HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(({ LoginModule }) => LoginModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.module').then(({ PostModule }) => PostModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
