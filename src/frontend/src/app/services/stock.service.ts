import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StockResource } from '../models/stock-resource.model';
import { BACKEND_URL_PREFIX } from '../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly stockUrl = BACKEND_URL_PREFIX + '/Stocks';

  constructor(private readonly http: HttpClient) {}

  getAllStockResources(): Observable<StockResource[]> {
    return this.http
      .get<StockResource[]>(this.stockUrl)
      .pipe(map((res) => res.sort((a, b) => a.name.localeCompare(b.name))));
  }

  addStockResource(data: {
    name: string;
    unit: string;
  }): Observable<StockResource> {
    const body = { name: data.name, unit: data.unit };
    return this.http.post<StockResource>(this.stockUrl, body);
  }

  deleteStockResource(id: number): Observable<any> {
    return this.http.delete(this.stockUrl + `/${id}`);
  }

  updateStockResourceAmount(id: number, amount: number): Observable<any> {
    return this.http.patch(this.stockUrl + `/${id}`, { amount });
  }
}
