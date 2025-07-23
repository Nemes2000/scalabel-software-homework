import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, mergeMap, of } from 'rxjs';
import { StockService } from '../../services/stock.service';
import {
  addStockResource,
  addStockResourceToList,
  deleteStockResource,
  getAllStocks,
  removeStockResourceFromList,
  setStockResourceList,
  updateStockResourceAmount,
  updateStockResourceAmountInList,
} from './stock.action';
import { PopupService } from '../../services/popup.service';
import { noAction } from '../app.actions';

@Injectable()
export class StockResourceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly stockService: StockService,
    private readonly popupService: PopupService
  ) {}

  getAllStockResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllStocks),
      exhaustMap(() =>
        this.stockService
          .getAllStockResources()
          .pipe(
            mergeMap((stockList) => of(setStockResourceList({ stockList })))
          )
      )
    )
  );

  addStockResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStockResource),
      exhaustMap((stock) =>
        this.stockService.addStockResource(stock).pipe(
          mergeMap((stock) => of(addStockResourceToList({ stock }))),
          catchError((error) => {
            this.popupService.callPopUpShowMethod(
              'Ilyen nevű elem már létezik!'
            );
            return of(noAction());
          })
        )
      )
    )
  );

  deleteStockResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStockResource),
      exhaustMap(({ id }) =>
        this.stockService
          .deleteStockResource(id)
          .pipe(mergeMap((_) => of(removeStockResourceFromList({ id }))))
      )
    )
  );

  updateStockAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStockResourceAmount),
      exhaustMap(({ id, amount }) =>
        this.stockService
          .updateStockResourceAmount(id, amount)
          .pipe(
            mergeMap((_) => of(updateStockResourceAmountInList({ id, amount })))
          )
      )
    )
  );
}
