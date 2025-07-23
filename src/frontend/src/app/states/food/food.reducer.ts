import { createReducer, on } from '@ngrx/store';
import { initialState } from './food.state';
import {
  addFoodToList,
  removeFoodFromList,
  setFilterText,
  setFoodList,
  updateFoodInList,
} from './food.action';
import { noAction } from '../app.actions';

export const foodReducer = createReducer(
  initialState,
  on(setFoodList, (state, { foodList }) => {
    return {
      ...state,
      foodList,
    };
  }),
  on(setFilterText, (state, { filter }) => {
    return {
      ...state,
      filterText: filter,
    };
  }),
  on(addFoodToList, (state, { food }) => {
    const newFood = { ...food };
    const newList = [...state.foodList, newFood].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return {
      ...state,
      foodList: newList,
    };
  }),
  on(removeFoodFromList, (state, { id }) => {
    const newList = [...state.foodList].filter((food) => food.id !== id);
    return {
      ...state,
      foodList: newList,
    };
  }),
  on(updateFoodInList, (state, { food }) => {
    const newList = [...state.foodList].map((element) => {
      if (element.id === food.id) return food;
      return element;
    });

    return {
      ...state,
      foodList: newList,
    };
  }),
  on(noAction, (state, {}) => {
    return { ...state };
  })
);
