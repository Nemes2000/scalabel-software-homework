import { createAction, props } from '@ngrx/store';
import { Table } from '../../models/table.model';

export const getAllTables = createAction('[TABLE] Get all tables');

export const setTableList = createAction(
  '[TABLE] Set table list',
  props<{ tableList: Table[] }>()
);

export const setFilterText = createAction(
  '[TABLE] Set filter text',
  props<{ min: number; max: number }>()
);

export const addTable = createAction(
  '[TABLE] Add table',
  props<{ name: string; seats: number }>()
);

export const addTableToList = createAction(
  '[TABLE] Add table to list',
  props<{ table: Table }>()
);

export const deleteTable = createAction(
  '[TABLE] Delete table by id',
  props<{ id: string }>()
);

export const removeTableFromList = createAction(
  '[TABLE] Remove table from list',
  props<{ id: string }>()
);
