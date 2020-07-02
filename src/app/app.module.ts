import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PersistenceModule } from './persistence/persistence.module';
import { PostProvidersModule } from './post/post-providers.module';
import { PageHeaderModule } from './page-header/page-header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PostProvidersModule,
    PersistenceModule.forRoot(),
    SharedModule.forRoot(),
    PageHeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
