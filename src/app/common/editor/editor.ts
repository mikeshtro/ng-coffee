import { Component, effect, ElementRef, inject, model, OnDestroy, signal } from '@angular/core';
import { indentWithTab } from '@codemirror/commands';
import { angular } from '@codemirror/lang-angular';
import { javascript } from '@codemirror/lang-javascript';
import { indentUnit } from '@codemirror/language';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';

@Component({
  selector: 'ngc-editor',
  template: '',
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    ::ng-deep .cm-editor {
      height: 100%;
      max-height: var(--editor-height);
      max-width: var(--editor-width);
    }
  `,
  host: {
    '[style.--editor-height]': 'editorSize().height + "px"',
    '[style.--editor-width]': 'editorSize().width + "px"',
  },
})
export class Editor implements OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly value = model<string>();

  protected editorSize = signal({
    width: this.elementRef.nativeElement.getBoundingClientRect().width,
    height: this.elementRef.nativeElement.getBoundingClientRect().height,
  });

  private readonly view = new EditorView({
    extensions: [
      basicSetup,
      javascript({ typescript: true }),
      angular(),
      indentUnit.of('  '),
      keymap.of([indentWithTab]),
      EditorView.updateListener.of(v => {
        const value = this.value();
        if (value !== v.view.state.doc.toString()) {
          this.value.set(v.view.state.doc.toString());
        }
      }),
    ],
    parent: this.elementRef.nativeElement,
  });

  private resizeObserver: ResizeObserver;

  constructor() {
    effect(() => {
      if (this.view.state.doc.toString() !== this.value()) {
        const transaction = this.view.state.update({
          changes: { from: 0, to: this.view.state.doc.toString().length, insert: this.value() },
        });
        this.view.dispatch(transaction);
      }
    });

    this.resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry == null) {
        return;
      }
      this.editorSize.set({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
}
