import { Component, computed, input, output } from '@angular/core';
import { CoffeeInput } from '../coffee-input/coffee-input';

@Component({
  selector: 'mcf-coffee-overview',
  imports: [CoffeeInput],
  templateUrl: './coffee-overview.html',
  styleUrl: './coffee-overview.css',
})
export class CoffeeOverview {
  public readonly amount = input<number, number | undefined>(0, {
    transform: value => value ?? 0,
  });
  public readonly price = input<number, number | undefined>(0, {
    transform: value => value ?? 0,
  });

  public readonly amountChange = output<number>();

  protected readonly computedPrice = computed(() => this.amount() * this.price());

  protected orderCoffee(value: number): void {
    this.amountChange.emit(value);
  }
}
