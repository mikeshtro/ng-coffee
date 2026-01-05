import { Component } from '@angular/core';

@Component({
  selector: 'mcf-coffee-overview',
  imports: [],
  templateUrl: './coffee-overview.html',
  styleUrl: './coffee-overview.css',
})
export class CoffeeOverview {
  protected amount = 0;

  protected orderCoffee(): void {
    this.amount += 1;
  }
}
