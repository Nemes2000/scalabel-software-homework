import { Food } from '../../models/food.model';
export interface FoodFeature {
  foodList: Food[];
  filterText: string | null;
}

export const initialState: FoodFeature = {
  foodList: [],
  filterText: null,
};
