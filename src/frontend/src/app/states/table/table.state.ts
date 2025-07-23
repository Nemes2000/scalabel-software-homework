import { Table } from '../../models/table.model';
export interface TableFeature {
  tableList: Table[];
  minSeats: number;
  maxSeats: number;
}

export const initialState: TableFeature = {
  tableList: [],
  minSeats: 0,
  maxSeats: 0,
};
