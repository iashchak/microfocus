import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [CommonModule],
})
export class PersistenceModule {
  static forRoot(): ModuleWithProviders<PersistenceModule> {
    return {
      ngModule: PersistenceModule,
      providers: [LocalStorageService],
    };
  }
}
