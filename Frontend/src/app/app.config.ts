import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // ingreso de providehttp para que permita el http client ANGULAR 17
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient()]
};
