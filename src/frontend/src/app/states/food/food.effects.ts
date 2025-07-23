import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, mergeMap, of } from 'rxjs';
import { FoodService } from '../../services/food.service';
import {
  addFood,
  addFoodToList,
  deleteFood,
  getAllFoods,
  removeFoodFromList,
  saveFoodImage,
  setFoodList,
  updateFood,
  updateFoodInList,
} from './food.action';
import { noAction } from '../app.actions';
import { PopupService } from '../../services/popup.service';

@Injectable()
export class FoodEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly foodService: FoodService,
    private readonly popupService: PopupService
  ) {}

  getAllFoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllFoods),
      exhaustMap(() =>
        this.foodService
          .getAllFoods()
          .pipe(mergeMap((foodList) => of(setFoodList({ foodList }))))
      )
    )
  );

  addFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFood),
      exhaustMap((food) =>
        this.foodService.addFood(food).pipe(
          mergeMap((newFood) => of(addFoodToList({ food: newFood }))),
          catchError((error) => {
            this.popupService.callPopUpShowMethod(
              'Ilyen nevű étel már létezik!'
            );
            return of(noAction());
          })
        )
      )
    )
  );

  deleteFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFood),
      exhaustMap(({ id }) =>
        this.foodService
          .deleteFood(id)
          .pipe(mergeMap((_) => of(removeFoodFromList({ id }))))
      )
    )
  );

  updateFoodPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFood),
      exhaustMap(({ id, data }) =>
        this.foodService
          .updateFood(id, data)
          .pipe(mergeMap((food) => of(updateFoodInList({ food }))))
      )
    )
  );

  saveFoodImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFoodImage),
      exhaustMap(({ blob, foodId, fileName }) =>
        this.foodService
          .saveFoodImage(blob, foodId, fileName)
          .pipe(mergeMap((food) => of(updateFoodInList({ food }))))
      )
    )
  );
}
