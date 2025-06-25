import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'homework-home-page',
  template: `
    <h1>Welcome to MorniNG coffee</h1>
    <main>
      <a class="link" routerLink="courses/angular-for-backend-developers/00-introduction">
        <span>Angular</span>
        <span>for backend devs</span>
      </a>
    </main>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0;
    }

    main {
      flex: 1;
    }

    .link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      border: 1px solid var(--color-darker);
      text-decoration: none;
      border-radius: 0.25rem;
      background-color: var(--color-light);
      padding: 0.75rem 2rem;
    }
  `,
  imports: [RouterLink],
})
export default class HomePageComponent {}
