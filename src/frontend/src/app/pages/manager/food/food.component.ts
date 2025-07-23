import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from '../../../components/dialogs/add-food-dialog/add-food-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';
import { ComponentsModule } from '../../../components/component.module';
import { Food } from '../../../models/food.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { selectFilteredFoodList } from '../../../states/food/food.selector';
import {
  addFood,
  deleteFood,
  getAllFoods,
  saveFoodImage,
  setFilterText,
  updateFood,
} from '../../../states/food/food.action';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    TranslocoPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss',
})
export class FoodPageComponent implements OnInit, OnDestroy {
  filteredFoods!: Food[];
  searchValue = '';
  private subscriptionHandler!: Subscription;
  constructor(
    private readonly matDialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllFoods());
    this.subscriptionHandler = this.store
      .select(selectFilteredFoodList)
      .subscribe((foods) => (this.filteredFoods = foods));
  }

  ngOnDestroy(): void {
    this.subscriptionHandler?.unsubscribe();
  }

  createFood() {
    const dialogRef = this.matDialog.open(AddFoodDialogComponent, {
      data: '',
      width: '60%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(addFood(result));
      }
    });
  }

  searchFood() {
    this.store.dispatch(setFilterText({ filter: this.searchValue }));
  }

  updateFood(food: Food) {
    this.store.dispatch(
      updateFood({
        id: food.id,
        data: food,
      })
    );
  }

  deleteFood(resource: Food) {
    this.store.dispatch(deleteFood({ id: resource.id }));
  }

  saveImage(data: { file: File; foodId: number }) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(data.file);
    reader.onload = () => {
      const blob = new Blob([reader.result!], { type: data.file.type });
      this.store.dispatch(
        saveFoodImage({ blob, foodId: data.foodId, fileName: data.file.name })
      );
    };
  }
}
