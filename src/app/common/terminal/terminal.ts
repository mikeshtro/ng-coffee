import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as xtermTerminal } from '@xterm/xterm';

import { TerminalSize } from './terminal-size';

@Component({
  selector: 'ngc-terminal',
  template: '',
  styles: `
    :host {
      display: block;
      border: var(--border);
    }
  `,
  host: {
    '(window:resize)': 'resize()',
  },
})
export class Terminal implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly data = input<string>();

  readonly sizeChange = output<TerminalSize>();
  readonly dataChange = output<string>();

  private readonly terminal = new xtermTerminal({
    convertEol: true,
    theme: {
      background: '#fefdfc',
      cursor: '#010003',
      cursorAccent: '#fefdfc',
      foreground: '#010003',
      selectionBackground: '#d6e5f3',
      selectionInactiveBackground: '#dfe5eb',
    },
  });
  private readonly fitAddon = new FitAddon();

  constructor() {
    effect(() => {
      const data = this.data();
      if (data != null) {
        this.terminal.write(data);
      }
    });
  }

  protected resize(): void {
    this.fitAddon.fit();
    this.sizeChange.emit({
      cols: this.terminal.cols,
      rows: this.terminal.rows,
    });
  }

  ngOnInit(): void {
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.open(this.elementRef.nativeElement);

    this.terminal.onData(data => this.dataChange.emit(data));

    this.resize();
  }

  ngOnDestroy(): void {
    this.fitAddon.dispose();
    this.terminal.dispose();
  }
}
