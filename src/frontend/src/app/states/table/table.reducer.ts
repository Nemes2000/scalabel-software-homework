import { createReducer, on } from '@ngrx/store';
import { initialState } from './table.state';
import {
  addTableToList,
  removeTableFromList,
  setFilterText,
  setTableList,
} from './table.action';
import { noAction } from '../app.actions';

export const tableReducer = createReducer(
  initialState,
  on(setTableList, (state, { tableList }) => {
    return {
      ...state,
      tableList,
    };
  }),
  on(setFilterText, (state, { min, max }) => {
    return {
      ...state,
      minSeats: min,
      maxSeats: max,
    };
  }),
  on(addTableToList, (state, { table }) => {
    const newTable = { ...table };
    const newList = [...state.tableList, newTable].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return {
      ...state,
      tableList: newList,
    };
  }),
  on(removeTableFromList, (state, { id }) => {
    const newList = state.tableList.filter((table) => table.id !== id);
    return {
      ...state,
      tableList: newList,
    };
  }),
  on(noAction, (state, {}) => {
    return { ...state };
  })
);
