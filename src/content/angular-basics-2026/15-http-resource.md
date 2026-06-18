# HTTP resource

Did you think we are finished? Yeah, we added some extra content due to a new Angular 22 release.
Let's add new feature. We want to add a button which loads some more details for the given coffee.
When the button is clicked we want to send a GET request to get the details for a coffee with
given ID. We want to display a message while loading, description when the data is loaded and
error message when the request fails.

We will use a `httpResource` resource from [resource API](https://angular.dev/guide/signals/resource)
which was marked as stable in Angular 22. We will listen to signals `isLoading`, `error` and `value`
and based on these signals display a value.

We prepared empty `CoffeeDetail` component for you. Use it inside a `CoffeeOverview` component and pass
a coffee ID as an input. Every time the ID is changed call `httpResource` to get new data. Then update
the `CoffeeDetail` component. Add a `showDetail` flag. When this flag is false, show a button. When the
button is clicked show `CoffeeDetail` component.

## Step 1

Import `httpResource` into `CoffeeService`

```diff
- import { HttpClient } from '@angular/common/http';
+ import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
+ import { CoffeeDetail } from '../coffee-detail';
```

```diff
  public getCoffeePrices(): Observable<CoffeePrice[]> {
    return this.httpClient.get<CoffeePrice[]>('api/coffee-prices');
  }

+ public getCoffeeDetail(id: () => string): HttpResourceRef<CoffeeDetail | undefined> {
+   return httpResource(() => `api/coffee-prices/${id()}`);
+ }
```

## Step 2

Call the new `getCoffeeDetail` method from `CoffeeDetail` component when the `id` input is changed.

```diff
- import { Component } from '@angular/core';
+ import { Component, inject, input } from '@angular/core';
+ import { CoffeeType } from '../../coffee-type';
+ import { CoffeeService } from '../../data/coffee.service';

- export class CoffeeDetail {}
+ export class CoffeeDetail {
+   private readonly coffeeService = inject(CoffeeService);
+
+   public readonly id = input.required<CoffeeType>();
+
+   protected readonly coffeeDetail = this.coffeeService.getCoffeeDetail(this.id);
+ }
```

and display the data in `CoffeeDetail` HTML template

```diff
+ @if (coffeeDetail.isLoading()) {
+   <span class="loading">Your coffee is on its way 😍</span>
+ } @else if (coffeeDetail.error(); as error) {
+   <span class="error">Sorry, we are out of coffee 😪</span>
+ } @else if (coffeeDetail.value(); as value) {
+   <p>Description: {{ value.description }}</p>
+ }
```

## Step 3

Add ID input to `CoffeeOverview` component

```diff
- import { Component, computed, input, output } from '@angular/core';
+ import { Component, computed, input, output, signal } from '@angular/core';
+ import { CoffeeType } from '../../coffee-type';
+ import { CoffeeDetail } from '../coffee-detail/coffee-detail';
```

```diff
  selector: 'mcf-coffee-overview',
- imports: [CoffeeInput, DecimalPipe],
+ imports: [CoffeeInput, DecimalPipe, CoffeeDetail],
  templateUrl: './coffee-overview.html',
```

```diff
+ public readonly id = input.required<CoffeeType>();

  public readonly amountChange = output<number>();

+ protected readonly showDetail = signal(false);
```

and pass it in the HTML template to `CoffeeDetail` component

```diff
  <mcf-coffee-input [value]="amount()" (valueChange)="orderCoffee($event)" />
+ @if (showDetail()) {
+   <mcf-coffee-detail [id]="id()" />
+ } @else {
+   <button type="button" (click)="showDetail.set(true)">Load detail</button>
+ }
```

## Step 4

Pass ID from `App` component to `CoffeeOverview` component

```diff
  <mcf-coffee-overview
+   [id]="coffee.id"
    [price]="coffee.price"
    [amount]="orderedCoffees.get(coffee.id)"
    (amountChange)="orderCoffee($event, coffee.id)"
  >
    <span class="coffee">{{ coffee.id | uppercase }}</span>
  </mcf-coffee-overview>
```
