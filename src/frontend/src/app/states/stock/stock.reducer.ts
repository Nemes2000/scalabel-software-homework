import { createReducer, on } from '@ngrx/store';
import { initialState } from './stock.state';
import {
  addStockResourceToList,
  removeStockResourceFromList,
  setFilterText,
  setStockResourceList,
  updateStockResourceAmountInList,
} from './stock.action';
import { noAction } from '../app.actions';

export const stockReducer = createReducer(
  initialState,
  on(setStockResourceList, (state, { stockList }) => {
    return {
      ...state,
      stockList,
    };
  }),
  on(setFilterText, (state, { filter }) => {
    return {
      ...state,
      filterText: filter,
    };
  }),
  on(addStockResourceToList, (state, { stock }) => {
    const newStockResource = { ...stock };
    const newList = [...state.stockList, newStockResource].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return {
      ...state,
      stockList: newList,
    };
  }),
  on(removeStockResourceFromList, (state, { id }) => {
    const newList = state.stockList.filter((stock) => stock.id != id);
    return {
      ...state,
      stockList: newList,
    };
  }),
  on(updateStockResourceAmountInList, (state, { id, amount }) => {
    const newList = state.stockList.map((stock) => {
      if (stock.id === id) return { ...stock, amount };
      return stock;
    });
    return {
      ...state,
      stockList: newList,
    };
  }),
  on(noAction, (state, {}) => {
    return { ...state };
  })
);
