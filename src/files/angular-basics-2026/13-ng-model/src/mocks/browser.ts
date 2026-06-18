import { delay, http, HttpResponse, PathParams } from 'msw';
import { setupWorker } from 'msw/browser';

const handlers = [
  http.get('api/coffee-prices', () => {
    return HttpResponse.json([
      { id: 'espresso', price: 12.43 },
      { id: 'latte', price: 22.64 },
      { id: 'cappuccino', price: 24.76 },
    ]);
  }),
  http.get<PathParams<'id'>>('api/coffee-prices/:id', async ({ params }) => {
    const id = params.id;
    await delay(1_000);
    switch (id) {
      case 'espresso':
        return HttpResponse.json({
          id: 'espresso',
          price: 12.43,
          description: 'Delicious espresso with 7g of coffee',
        });
      case 'latte':
        return HttpResponse.json({
          id: 'latte',
          price: 22.64,
          description: 'Heh, if you want to ruin coffee with milk',
        });
      default:
        return new HttpResponse(null, { status: 404, statusText: 'Not found' });
    }
  }),
];

export const worker = setupWorker(...handlers);
