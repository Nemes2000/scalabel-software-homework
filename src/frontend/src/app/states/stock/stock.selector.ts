import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { StockFeature } from './stock.state';

export const selectStockFeature = (state: AppState) => state.stockFeature;

export const selectStockList = createSelector(
  selectStockFeature,
  (state: StockFeature) => state.stockList
);

export const selectFilteredStockList = createSelector(
  selectStockFeature,
  (state: StockFeature) => {
    if (state.filterText)
      return state.stockList.filter((stock) =>
        stock.name.toLowerCase().startsWith(state.filterText!.toLowerCase())
      );
    return state.stockList;
  }
);
