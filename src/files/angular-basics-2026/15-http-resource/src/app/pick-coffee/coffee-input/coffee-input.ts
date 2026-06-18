import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mcf-coffee-input',
  imports: [FormsModule],
  templateUrl: './coffee-input.html',
  styleUrl: './coffee-input.css',
})
export class CoffeeInput {
  public readonly value = model.required<number>();

  protected orderCoffee(value: number): void {
    this.value.set(value);
  }
}
