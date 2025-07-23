import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FoodFeature } from './food.state';

export const selectFoodFeature = (state: AppState) => state.foodFeature;

export const selectFoodList = createSelector(
  selectFoodFeature,
  (state: FoodFeature) => state.foodList
);

export const selectFilteredFoodList = createSelector(
  selectFoodFeature,
  (state: FoodFeature) => {
    if (state.filterText)
      return state.foodList.filter((food) =>
        food.name.toLowerCase().startsWith(state.filterText!.toLowerCase())
      );
    return state.foodList;
  }
);
