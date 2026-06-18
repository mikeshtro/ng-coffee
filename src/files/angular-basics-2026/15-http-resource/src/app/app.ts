import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';
import { CoffeeType } from './coffee-type';
import { CoffeeService } from './data/coffee.service';
import { CoffeeOverview } from './pick-coffee/coffee-overview/coffee-overview';
import { TotalPrice } from './total-price';

@Component({
  selector: 'mcf-root',
  imports: [DecimalPipe, UpperCasePipe, CoffeeOverview, TotalPrice],
  template: `
    <div class="total">
      Total price: {{ orderedCoffees | totalPrice: coffees() | number: '1.0-1' }}
    </div>
    <div>
      @for (coffee of coffees(); track coffee.id) {
        <mcf-coffee-overview
          [price]="coffee.price"
          [amount]="orderedCoffees.get(coffee.id)"
          (amountChange)="orderCoffee($event, coffee.id)"
        >
          <span class="coffee">{{ coffee.id | uppercase }}</span>
        </mcf-coffee-overview>
      }
    </div>
  `,
  styles: `
    .coffee {
      color: #12ae12;
    }

    .total {
      font-size: 2rem;
      line-height: 1.75;
    }
  `,
})
export class App {
  private readonly coffeeService = inject(CoffeeService);
  private readonly coffees$ = this.coffeeService.getCoffeePrices().pipe(catchError(() => EMPTY));
  protected readonly coffees = toSignal(this.coffees$, { initialValue: [] });

  protected orderedCoffees = new Map<CoffeeType, number>();

  protected orderCoffee(amount: number, id: CoffeeType): void {
    const copy = new Map(this.orderedCoffees);
    copy.set(id, amount);
    this.orderedCoffees = copy;
    throw new Error('Function not implemented.');
  }
}
