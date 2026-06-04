import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { withComponentInputBinding } from '@angular/router';

import 'prismjs/plugins/diff-highlight/prism-diff-highlight';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(withComponentInputBinding()),
    provideHttpClient(withInterceptors([requestContextInterceptor])),
    provideClientHydration(withEventReplay(), withNoIncrementalHydration()),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
  ],
};
