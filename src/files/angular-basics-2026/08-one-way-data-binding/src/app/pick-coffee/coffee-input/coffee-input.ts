import { Component, model } from '@angular/core';

@Component({
  selector: 'mcf-coffee-input',
  imports: [],
  templateUrl: './coffee-input.html',
  styleUrl: './coffee-input.css',
})
export class CoffeeInput {
  public readonly value = model.required<number>();

  protected orderCoffee(): void {
    this.value.update(value => value + 1);
  }
}
