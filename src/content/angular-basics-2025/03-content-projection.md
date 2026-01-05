# Content projection

App component's and CoffeeOverview component's CSS styles were updated for you, so you can focus on the
Angular part. You can see the changes in AppComponent styles property and in coffee-overview.css
file.

The next thing to do in our application is to update CoffeeOverview so that is a card that
wraps whatever is passed into it. The application will show this card for each coffee type instead
of just displaying the coffee type. CoffeeOverview should show "Select me, I am" message with
"coffee" class applied to it and then display all the elements passed between its opening and closing
tags.

Use [content projection](https://angular.dev/guide/components/content-projection#) to achieve this
behavior. In CoffeeOverview you can use ng-content element as a placeholder. This placeholder will
be replaced in runtime by child elements passed through HTML.

## Step 1

Update coffee-overview.html to contain the message and ng-content element

```diff
- <h1>coffee-overview works!</h1>
+ <span class="coffee">Select me, I am</span>
+ <ng-content />
```

## Step 2

Update app.ts template to contain three instances of CoffeeOverview, one for each
coffee type

```diff
template: `
- <span class="coffee">Espresso</span>
- <span class="coffee">Latte</span>
- <span class="coffee">Cappuccino</span>
- <mcf-coffee-overview></mcf-coffee-overview>
+ <mcf-coffee-overview>
+   <span class="coffee">Espresso</span>
+ </mcf-coffee-overview>
+ <mcf-coffee-overview>
+   <span class="coffee">Latte</span>
+ </mcf-coffee-overview>
+ <mcf-coffee-overview>
+   <span class="coffee">Cappuccino</span>
+ </mcf-coffee-overview>
`,
```
