import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeePrice } from '../coffee-price';

@Service()
export class CoffeeService {
  private readonly httpClient = inject(HttpClient);

  public getCoffeePrices(): Observable<CoffeePrice[]> {
    return this.httpClient.get<CoffeePrice[]>('api/coffee-prices');
  }
}
