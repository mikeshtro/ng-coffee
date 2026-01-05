# Signal

In Angular applications we can often see signals. Signal is a simple reactive primitive
for angular to create and manage state. The basic signal is just a wrapper around
a value, but Angular understands the signals and can optimize components that use
signals in the build time. You can read more about signals
[in the docs](https://angular.dev/essentials/signals).

For now just update the application to change the property to a signal to see how it
works. Looks like a useless wrapper to do a simple thing? Don't worry we will come
to this later to see at least some signal powers.

## Step 1

Update the `amount` property to a signal and update `orderCoffee` method to update the
signal value

```diff
  export class CoffeeOverview {
-   protected amount = 0;
+   protected readonly amount = signal(0);
+
+   protected orderCoffee(): void {
-     this.amount += 1;
+     this.amount.update(amount => amount + 1);
+   }
+ }
```

## Step 2

Update the property binding in the HTML template to read the signal value

```diff
- <input type="number" disabled />
+ <input type="number" [value]="amount()" disabled />
```
