import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BookListComponent } from './app/components/book-list/book-list.component';
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(BookListComponent, {
  providers: [provideHttpClient()]
});
