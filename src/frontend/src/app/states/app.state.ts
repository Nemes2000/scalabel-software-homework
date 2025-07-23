import { FoodFeature } from './food/food.state';
import { foodReducer } from './food/food.reducer';
import { FoodEffects } from './food/food.effects';
import { StockFeature } from './stock/stock.state';
import { stockReducer } from './stock/stock.reducer';
import { StockResourceEffects } from './stock/stock.effects';
import { TableFeature } from './table/table.state';
import { tableReducer } from './table/table.reducer';
import { TableEffects } from './table/table.effects';
import { ScheduleFeature } from './schedule/schedule.state';
import { scheduleReducer } from './schedule/schedule.reducer';
import { ScheduleEffects } from './schedule/schedule.effects';
import { EmployeeFeature } from './employee/employee.state';
import { EmployeeEffects } from './employee/employee.effects';
import { employeeReducer } from './employee/employee.reducer';

export interface AppState {
  foodFeature: FoodFeature;
  stockFeature: StockFeature;
  tableFeature: TableFeature;
  scheduleFeature: ScheduleFeature;
  employeeFeature: EmployeeFeature;
}

export const appReducer = {
  foodFeature: foodReducer,
  stockFeature: stockReducer,
  tableFeature: tableReducer,
  scheduleFeature: scheduleReducer,
  employeeFeature: employeeReducer,
};

export const appEffects = [
  FoodEffects,
  StockResourceEffects,
  TableEffects,
  ScheduleEffects,
  EmployeeEffects,
];
