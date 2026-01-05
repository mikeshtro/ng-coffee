# Computed signal

As was already mentioned, the application can now have performance issues and buggy behavior due
to calling methods from templates. Let's explore some techniques how to achieve the same result more
Angular way.

One of the options is to move the function into some child component and pass all the data as inputs.
Then use computed signal to calculate the total price.

Refactor the application and move move the `getPrice` method into the CoffeeOverview. This time will
make the method private. Add one more input to the component `price`. Create a new `computedPrice`
computed signal. Move the implementation of the `getPrice` method into the signal. Call the `getPrice`
method from `ngOnChanges` lifecycle hook and store the result into a `computedPrice` property. Show
this property value in the CoffeeOverview's HTML template.

## Step 1

Create a price input in the CoffeeOverview

```diff
  public readonly amount = input<number, number | undefined>(0, { transform: (value) => value ?? 0 });
+ public readonly price = input<number, number | undefined>(0, { transform: (value) => value ?? 0 });
```

and remove the `getPrice` method from app component.

```diff
- protected getPrice(id: CoffeeType): number {
-   const price = this.coffees.find(x => x.id === id)?.price;
-   const amount = this.orderedCoffees.get(id);
-
-   if (price == null || amount == null) {
-     return 0;
-   }
-
-   return price * amount;
- }
```

## Step 2

Create protected property called `computedPrice` in CoffeeOverview and make it a computed signal. Computed
signal will always be recalculated when one of its signals emits a new value. In this implement the `getPrice`
method again.

```diff
+ protected readonly computedPrice = computed(() => this.amount() * this.price());
```

## Step 3

Move the element displaying the computed value from AppComponent's HTML template into
CoffeeOverviewComponent's HTML template and show the `computedPrice` property value.

```diff
  <span class="coffee">Select me, I am</span>
+ <span>Price: {{ computedPrice() }}</span>
  <ng-content />
```

## Step 4

Pass the price of given coffee into the new price input in AppComponent's HTML template.

```diff
 <mcf-coffee-overview
   [price]="coffee.price"
+  [amount]="orderedCoffees.get(coffee.id)"
   (amountChange)="orderCoffee($event, coffee.id)"
 >
   <span class="coffee"> {{ coffee.id }} </span>
-  <span>Price: {{ getPrice(coffee.id) }}</span>
 </mcf-coffee-overview>
```
