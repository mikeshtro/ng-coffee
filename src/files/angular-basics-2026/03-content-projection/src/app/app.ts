import { Component } from '@angular/core';
import { CoffeeOverview } from './pick-coffee/coffee-overview/coffee-overview';

@Component({
  selector: 'mcf-root',
  imports: [CoffeeOverview],
  template: `
    <span>Espresso</span>
    <span>Latte</span>
    <span>Cappuccino</span>
    <mcf-coffee-overview />
  `,
  styles: `
    .coffee {
      color: #12ae12;
    }
  `,
})
export class App {}
