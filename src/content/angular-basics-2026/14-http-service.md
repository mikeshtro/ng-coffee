# HTTP service

One last thing is missing in order to consider this application finalized. We still have hardcoded
prices in the App component. In the real application we would like to read these values from
the backend.

Let's update the application to read it using HTTP. Create a singleton service, that injects
`HttpClient` and create one endpoint to `api/coffee-prices`. Don't worry the backend is ready to
use. Then replace the hardcoded coffee prices by using the endpoint.

## Step 1

Create a service with `HttpClient` injected.

```diff
+ import { HttpClient } from '@angular/common/http';
+ import { inject, Service } from '@angular/core';
+ import { Observable } from 'rxjs';
+ import { CoffeePrice } from '../coffee-price';

+ @Service()
+ export class CoffeeService {
+   private readonly httpClient = inject(HttpClient);
+
+   public getCoffeePrices(): Observable<CoffeePrice[]> {
+     return this.httpClient.get<CoffeePrice[]>('api/coffee-prices');
+   }
+ }
```

## Step 2

Update App to get the data from the service

```diff
- import { Component } from '@angular/core';
+ import { Component, inject } from '@angular/core';
+ import { toSignal } from '@angular/core/rxjs-interop';
+ import { catchError, EMPTY } from 'rxjs';
+ import { CoffeeService } from './data/coffee.service';
```

```diff
- protected readonly coffees: CoffeePrice[] = [
-  { id: 'espresso', price: 12.43 },
-   { id: 'latte', price: 22.64 },
-   { id: 'cappuccino', price: 24.76 },
- ];
+ private readonly coffeeService = inject(CoffeeService);
+ private readonly coffees$ = this.coffeeService.getCoffeePrices().pipe(catchError(() => EMPTY));
+ protected readonly coffees = toSignal(this.coffees$, { initialValue: [] });
```

and update the component template to read the data

```diff
- <div class="total">Total price: {{ orderedCoffees | totalPrice: coffees | number: '1.0-1' }}</div>
+ <div class="total">Total price: {{ orderedCoffees | totalPrice: coffees() | number: '1.0-1' }}</div>
  <div>
-   @for (coffee of coffees; track coffee.id) {
+   @for (coffee of coffees(); track coffee.id) {
      <mcf-coffee-overview
        [price]="coffee.price"
        [amount]="orderedCoffees.get(coffee.id)"
        (amountChange)="orderCoffee($event, coffee.id)"
      >
        <span class="coffee">{{ coffee.id | uppercase }}</span>
      </mcf-coffee-overview>
    }
  </div>
```
