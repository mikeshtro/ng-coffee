import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

const handlers = [
  http.get('api/coffee-prices', () => {
    return HttpResponse.json([
      { id: 'espresso', price: 12.43 },
      { id: 'latte', price: 22.64 },
      { id: 'cappuccino', price: 24.76 },
    ]);
  }),
];

export const worker = setupWorker(...handlers);
