import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { FeatureToggleService } from './feature-toggle.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, UserService, FeatureToggleService],
    };
  }
}
