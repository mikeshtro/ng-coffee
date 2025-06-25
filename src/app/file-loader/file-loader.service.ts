import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FileSystemTree } from '@webcontainer/api';
import { catchError, EMPTY, map, OperatorFunction, pipe, Subject, switchMap } from 'rxjs';

import { WithSlug } from './with-slug';

@Injectable({ providedIn: 'root' })
export class FileLoaderService {
  private readonly httpClient = inject(HttpClient);

  private readonly load$ = new Subject<{ course: string; slug: string }>();

  readonly files$ = this.load$.pipe(this.getFiles());

  loadFiles(course: string, slug: string): void {
    this.load$.next({ course, slug });
  }

  private getFiles(): OperatorFunction<{ course: string; slug: string }, WithSlug<FileSystemTree>> {
    return switchMap(({ course, slug }) =>
      this.httpClient
        .get<FileSystemTree>(`${course}/${slug}.json`)
        .pipe(this.processError(), this.withSlug(slug))
    );
  }

  private withSlug<T>(slug: string): OperatorFunction<T, WithSlug<T>> {
    return pipe(map(value => ({ slug, value })));
  }

  private processError<T>(): OperatorFunction<T, T | never> {
    return catchError(error => {
      console.error(error);
      return EMPTY;
    });
  }
}
