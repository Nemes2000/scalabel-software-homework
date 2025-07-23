import { createAction, props } from '@ngrx/store';
import { StockResource } from '../../models/stock-resource.model';

export const getAllStocks = createAction('[STOCK] Get all stocks');

export const setStockResourceList = createAction(
  '[STOCK] Set stock list',
  props<{ stockList: StockResource[] }>()
);

export const setFilterText = createAction(
  '[STOCK] Set filter text',
  props<{ filter: string | null }>()
);

export const addStockResource = createAction(
  '[STOCK] Add stock',
  props<{ name: string; unit: string }>()
);

export const addStockResourceToList = createAction(
  '[STOCK] Add stock to list',
  props<{ stock: StockResource }>()
);

export const deleteStockResource = createAction(
  '[STOCK] Delete stock by id',
  props<{ id: number }>()
);

export const removeStockResourceFromList = createAction(
  '[STOCK] Remove stock from list',
  props<{ id: number }>()
);

export const updateStockResourceAmount = createAction(
  '[STOCK] Update stock amount',
  props<{ id: number; amount: number }>()
);

export const updateStockResourceAmountInList = createAction(
  '[STOCK] Update stock amount in list',
  props<{ id: number; amount: number }>()
);
