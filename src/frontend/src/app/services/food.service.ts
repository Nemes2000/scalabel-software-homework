import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL_PREFIX } from '../utils/constants';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly foodUrl = BACKEND_URL_PREFIX + '/Foods';

  constructor(private readonly http: HttpClient) {}
  //Soup, Main, Dessert, FastFood, Beverage
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodUrl).pipe(
      map((foods) =>
        foods.map((food) => ({
          ...food,
          imagePath:
            food.imagePath != ''
              ? `${environment.apiUrl}/Foods/${food.id}/image`
              : null,
        }))
      )
    );
  }

  addFood(data: {
    name: string;
    price: number;
    description: string;
    category: string;
    imagePath: string;
  }): Observable<Food> {
    return this.http.post<Food>(this.foodUrl, data);
  }

  deleteFood(id: number): Observable<any> {
    return this.http.delete(this.foodUrl + `/${id}`);
  }

  updateFood(
    id: number,
    data: { price: number; description: string; category: string }
  ): Observable<Food> {
    return this.http.patch<Food>(this.foodUrl + `/${id}`, data).pipe(
      map((food) => {
        return {
          ...food,
          imagePath: `${environment.apiUrl}/Foods/${food.id}/image`,
        };
      })
    );
  }

  saveFoodImage(blob: any, foodId: number, fileName: string) {
    const formData = new FormData();
    formData.append('image', blob, fileName);
    return this.http
      .patch<Food>(this.foodUrl + `/${foodId}/image`, formData)
      .pipe(
        map((food) => {
          return {
            ...food,
            imagePath: `${environment.apiUrl}/Foods/${food.id}/image`,
          };
        })
      );
  }
}
