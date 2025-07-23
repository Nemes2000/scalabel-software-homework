import { createAction, props } from '@ngrx/store';
import { Food } from '../../models/food.model';

export const getAllFoods = createAction('[FOOD] Get all foods');

export const setFoodList = createAction(
  '[FOOD] Set food list',
  props<{ foodList: Food[] }>()
);

export const setFilterText = createAction(
  '[FOOD] Set filter text',
  props<{ filter: string | null }>()
);

export const addFood = createAction(
  '[FOOD] Add food',
  props<{
    name: string;
    price: number;
    description: string;
    category: string;
    imagePath: string;
  }>()
);

export const addFoodToList = createAction(
  '[FOOD] Add food to list',
  props<{ food: Food }>()
);

export const deleteFood = createAction(
  '[FOOD] Delete food by id',
  props<{ id: number }>()
);

export const removeFoodFromList = createAction(
  '[FOOD] Remove food from list',
  props<{ id: number }>()
);

export const updateFood = createAction(
  '[FOOD] Update food',
  props<{
    id: number;
    data: {
      price: number;
      description: string;
      category: string;
    };
  }>()
);

export const updateFoodInList = createAction(
  '[FOOD] Update food in list',
  props<{ food: Food }>()
);

export const saveFoodImage = createAction(
  '[FOOD] Save food image',
  props<{ blob: any; foodId: number; fileName: string }>()
);
