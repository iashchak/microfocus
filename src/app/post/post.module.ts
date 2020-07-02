import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../page-header/page-header.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    PostRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PostModule {}
