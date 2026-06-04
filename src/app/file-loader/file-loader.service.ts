import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { FileSystemTree } from '@webcontainer/api';
import { catchError, EMPTY, map, OperatorFunction, Subject, switchMap } from 'rxjs';

@Service()
export class FileLoaderService {
  private readonly httpClient = inject(HttpClient);

  private readonly load$ = new Subject<{ course: string; slug: string }>();

  readonly files$ = this.load$.pipe(this.getFiles());

  loadFiles(course: string, slug: string): void {
    this.load$.next({ course, slug });
  }

  private getFiles(): OperatorFunction<
    { course: string; slug: string },
    { course: string; slug: string; value: FileSystemTree }
  > {
    return switchMap(({ course, slug }) =>
      this.httpClient.get<FileSystemTree>(`${course}/${slug}.json`).pipe(
        this.processError(),
        map(value => ({ course, slug, value }))
      )
    );
  }

  private processError<T>(): OperatorFunction<T, T | never> {
    return catchError(error => {
      console.error(error);
      return EMPTY;
    });
  }
}
