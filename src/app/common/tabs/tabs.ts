import { Component, computed, input, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngc-tabs',
  template: `
    @for (file of displayFiles(); track file.fullName) {
      <button [class.active]="file.fullName === openFile()" (click)="openFile.set(file.fullName)">
        {{ file.shortName }}
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    button {
      height: 2rem;
      width: 100%;
      overflow: hidden;
      text-align: start;
      text-wrap: nowrap;
      text-overflow: ellipsis;
      border: none;
      background: none;
    }

    button:hover {
      background: var(--color-standard);
    }

    .active {
      background: var(--color-lighter);
    }
  `,
})
export class Tabs {
  readonly files = input<string[]>();

  readonly openFile = model<string>();

  protected readonly displayFiles = computed(() =>
    this.files()?.map(file => ({ fullName: file, shortName: file.split('/').at(-1) }))
  );
}
