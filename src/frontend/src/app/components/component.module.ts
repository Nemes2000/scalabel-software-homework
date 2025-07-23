import { NgModule } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { MainNavigaionCardComponent } from './main-navigaion-card/main-navigaion-card.component';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from './stock-card/stock-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeInfoCardComponent } from './employee-info-card/employee-info-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { FoodCardComponent } from './food-card/food-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeTimeTableComponent } from './employee-time-table/employee-time-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    MainNavigaionCardComponent,
    StockCardComponent,
    EmployeeInfoCardComponent,
    FoodCardComponent,
    EmployeeTimeTableComponent,
  ],
  imports: [
    TranslocoPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
  ],
  exports: [
    MainNavigaionCardComponent,
    StockCardComponent,
    EmployeeInfoCardComponent,
    FoodCardComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    EmployeeTimeTableComponent,
  ],
})
export class ComponentsModule {}
