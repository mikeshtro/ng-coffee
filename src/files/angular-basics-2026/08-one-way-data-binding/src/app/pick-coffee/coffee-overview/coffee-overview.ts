import { Component, signal } from '@angular/core';
import { CoffeeInput } from '../coffee-input/coffee-input';

@Component({
  selector: 'mcf-coffee-overview',
  imports: [CoffeeInput],
  templateUrl: './coffee-overview.html',
  styleUrl: './coffee-overview.css',
})
export class CoffeeOverview {
  protected readonly amount = signal(0);

  protected orderCoffee(): void {
    this.amount.update(amount => amount + 1);
  }
}
