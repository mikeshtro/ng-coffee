# Using component

Next step in the application is to wrap the coffee type names into a component so that you can not
only display the coffee type but add some styles and basic logic to it.

What's a component? Component is a main building block of Angular application. It represents part
of the UI. Read more about components in the [docs](https://angular.dev/essentials/components).

Second component was already generated for you using CLI command

```shell
ng generate component pick-coffee/coffee-overview
```

There are multiple CLI commands that can help you scaffold your application. If you are interested
read about CLI in the [docs](https://angular.dev/tools/cli#)

Used command generated three component files: HTML, CSS and TypeScript parts of the component.
Now import the generated component into the app component and use it in its HTML template without
any additional changes.

To use a component inside another component's HTML template you need to first add it to the
component imports and then use the component selector in the parent component HTML template.

## Step 1

Import the component TypeScript file into the App component TypeScript file

```diff
+ import {
+  CoffeeOverview
+ } from './pick-coffee/coffee-overview/coffee-overview';
```

## Step 2

Use the imported class in the App's imports

```diff
- imports: [],
+ imports: [CoffeeOverview],
```

## Step 3

Use the imported component in the App's HTML template using its selector. It will contain
the component by using its selector

```diff
template: `
  <span>Espresso</span>
  <span>Latte</span>
  <span>Cappuccino</span>
+ <mcf-coffee-overview></mcf-coffee-overview>
`
```
