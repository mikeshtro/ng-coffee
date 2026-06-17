import { Component } from '@angular/core';
import { CoffeeType } from './coffee-type';
import { CoffeeOverview } from './pick-coffee/coffee-overview/coffee-overview';

@Component({
  selector: 'mcf-root',
  imports: [CoffeeOverview],
  template: `
    @for (coffee of coffees; track coffee) {
      <mcf-coffee-overview>
        <span class="coffee">{{ coffee }}</span>
      </mcf-coffee-overview>
    }
  `,
  styles: `
    .coffee {
      color: #12ae12;
    }
  `,
})
export class App {
  protected readonly coffees: CoffeeType[] = ['espresso', 'latte', 'cappuccino'];
}
