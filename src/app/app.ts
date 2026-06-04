import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ngc-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host {
      display: block;
      margin: 0 auto;
      height: 100%;
    }
  `,
})
export class App {}
