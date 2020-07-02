import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LocalStorage } from './app/persistence/local-storage';
import { WindowObject } from './app/window-object';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  { provide: LocalStorage, useValue: window.localStorage },
  { provide: WindowObject, useValue: window },
])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
