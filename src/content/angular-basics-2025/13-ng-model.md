# NgModel

Extend the application so when user writes a number into CoffeeInput components's input it will reflect
every user change, ignore negative values and non-valid values. Don't forget to enable the input first.

Use `ngModel` directive from FormsModule module for this functionality. This directive wraps the
logic from HTML form elements and provides easy API for basic form tasks. Update `orderCoffee` method
inside CoffeeInput so that it accepts one parameter representing the new value. Update the HTML template
in CoffeeInput and use `ngModel` directive on the input element, listen to `ngModelChange` output and
call the `orderCoffee` method with whatever the output passes.

## Step 1

Import `FormModule` into coffee input component

```diff
  import { Component, EventEmitter, Input, Output } from '@angular/core';
+ import { FormsModule } from '@angular/forms';
```

```diff
- imports: [],
+ imports: [FormsModule],
```

and use it inside CoffeeInputComponent's HTML template and pass the value property into it.

```diff
- <input type="number" [value]="value()" disabled />
+ <input type="number" [ngModel]="value()" />
```

## Step 2

Update `orderCoffee` method to accept one parameter

```diff
- protected orderCoffee(): void {
-   this.value.update((value) => value + 1);
+ protected orderCoffee(value: number): void {
+   this.value.set(value)
  }
```

Then use the method in HTML template to listen for `ngModelChange` output

```diff
- <input type="number" [ngModel]="value()" />
+ <input type="number" [ngModel]="value()" (ngModelChange)="orderCoffee($event)" />
```

And fix the button calling the method as well

```diff
- <button (click)="orderCoffee()">Give me more</button>
+ <button (click)="orderCoffee(value() + 1)">Give me more</button>
```
