import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, mergeMap, of } from 'rxjs';
import { TableService } from '../../services/table.service';
import {
  addTable,
  addTableToList,
  deleteTable,
  getAllTables,
  removeTableFromList,
  setTableList,
} from './table.action';
import { PopupService } from '../../services/popup.service';
import { noAction } from '../app.actions';

@Injectable()
export class TableEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly tableService: TableService,
    private readonly popupService: PopupService
  ) {}

  getAllTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTables),
      exhaustMap(() =>
        this.tableService
          .getAllTables()
          .pipe(mergeMap((tableList) => of(setTableList({ tableList }))))
      )
    )
  );

  addTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTable),
      exhaustMap((table) =>
        this.tableService.addTable(table).pipe(
          mergeMap((newTable) => of(addTableToList({ table: newTable }))),
          catchError((error) => {
            this.popupService.callPopUpShowMethod(
              'Ilyen nevű asztal már létezik!'
            );
            return of(noAction());
          })
        )
      )
    )
  );

  deleteTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTable),
      exhaustMap(({ id }) =>
        this.tableService
          .deleteTable(id)
          .pipe(mergeMap((_) => of(removeTableFromList({ id }))))
      )
    )
  );
}
