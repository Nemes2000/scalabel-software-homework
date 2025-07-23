import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { MANAGER_ROLE_STR } from './utils/constants';
import { TablePageComponent } from './pages/manager/table/table.component';
import { StockPageComponent } from './pages/manager/stock/stock.component';
import { EmployeePageComponent } from './pages/manager/employee/employee.component';
import { SchedulePageComponent } from './pages/manager/schedule/schedule.component';
import { FoodPageComponent } from './pages/manager/food/food.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'table',
    component: TablePageComponent,
  },
  {
    path: 'stock',
    component: StockPageComponent,
  },
  {
    path: 'employee',
    component: EmployeePageComponent,
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
  },
  {
    path: 'food',
    component: FoodPageComponent,
  },
  { path: '**', redirectTo: '' },
];
