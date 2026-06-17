import { Component } from '@angular/core';
import { CoffeeOverview } from './pick-coffee/coffee-overview/coffee-overview';

@Component({
  selector: 'mcf-root',
  imports: [CoffeeOverview],
  template: `
    <mcf-coffee-overview>
      <span class="coffee">Espresso</span>
    </mcf-coffee-overview>
    <mcf-coffee-overview>
      <span class="coffee">Latte</span>
    </mcf-coffee-overview>
    <mcf-coffee-overview>
      <span class="coffee">Cappuccino</span>
    </mcf-coffee-overview>
  `,
  styles: `
    .coffee {
      color: #12ae12;
    }
  `,
})
export class App {}
