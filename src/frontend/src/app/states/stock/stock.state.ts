import { StockResource } from '../../models/stock-resource.model';
export interface StockFeature {
  stockList: StockResource[];
  filterText: string | null;
}

export const initialState: StockFeature = {
  stockList: [],
  filterText: null,
};
