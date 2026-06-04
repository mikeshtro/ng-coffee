import { Component, computed, effect, model, signal } from '@angular/core';
import { Editor } from '../editor/editor';
import { Tabs } from '../tabs/tabs';
import { FileContent } from './file-content';

@Component({
  selector: 'ngc-multi-editor',
  imports: [Tabs, Editor],
  host: {
    '(keydown)': 'onSave($event)',
  },
  template: `
    <div>
      <span class="header">
        Files
        <button class="icon-button" (click)="saveFiles()">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0
                1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </button>
      </span>
      <ngc-tabs
        [files]="fileNames()"
        [openFile]="openFile?.fileName"
        (openFileChange)="changeFile($event)"
      />
    </div>
    <ngc-editor [value]="openFile?.content ?? ''" (valueChange)="updateFile($event)" />
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(12rem, 1fr) 3fr;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      padding: 0.5rem 1rem;
      background: var(--color-light);
      border-bottom: var(--border);
    }

    .icon-button {
      padding: 0;
      background: none;
      border: none;
      height: 1.5rem;
      width: 1.5rem;
    }

    .icon {
      fill: none;
      stroke: var(--color-dark);
    }
  `,
})
export class MultiEditor {
  readonly files = model<FileContent[]>();

  protected readonly fileNames = computed(() => this.files()?.map(({ fileName }) => fileName));

  protected openFile: FileContent | undefined;

  private readonly unsavedFiles = signal<FileContent[]>([]);

  constructor() {
    effect(() => {
      const newFiles = this.files();
      this.unsavedFiles.set(newFiles ?? []);
      this.openFile =
        newFiles?.find(file => file.fileName === this.openFile?.fileName) ?? newFiles?.at(0);
    });
  }

  protected changeFile(fileName: string | undefined): void {
    this.openFile = this.files()?.find(file => file.fileName === fileName);
  }

  protected updateFile(content: string | undefined): void {
    this.unsavedFiles.update(files =>
      files?.map(file =>
        file.fileName === this.openFile?.fileName
          ? { fileName: file.fileName, content: content ?? '' }
          : file
      )
    );
  }

  protected onSave(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      this.saveFiles();
    }
  }

  protected saveFiles(): void {
    this.files.set(this.unsavedFiles());
  }
}
