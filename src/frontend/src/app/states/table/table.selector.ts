import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TableFeature } from './table.state';

export const selectTableFeature = (state: AppState) => state.tableFeature;

export const selectTableList = createSelector(
  selectTableFeature,
  (state: TableFeature) => state.tableList
);

export const selectFilteredTableList = createSelector(
  selectTableFeature,
  (state: TableFeature) => {
    return state.tableList.filter(
      (table) => table.seats >= state.minSeats && table.seats <= state.maxSeats
    );
  }
);

export const selectMaxSeat = createSelector(
  selectTableFeature,
  (state: TableFeature) => Math.max(...state.tableList.map((e) => e.seats))
);
