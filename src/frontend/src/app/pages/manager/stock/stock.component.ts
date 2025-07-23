import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/component.module';
import { StockResource } from '../../../models/stock-resource.model';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddResourceDialogComponent } from '../../../components/dialogs/add-resource-dialog/add-resource-dialog.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { selectFilteredStockList } from '../../../states/stock/stock.selector';
import {
  addStockResource,
  deleteStockResource,
  getAllStocks,
  setFilterText,
  updateStockResourceAmount,
} from '../../../states/stock/stock.action';

@Component({
  selector: 'app-stock',
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
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockPageComponent implements OnInit, OnDestroy {
  id = 2;
  filteredStock!: StockResource[];
  searchValue = '';
  private subscriptionHandler!: Subscription;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllStocks());
    this.subscriptionHandler = this.store
      .select(selectFilteredStockList)
      .subscribe((stock) => (this.filteredStock = stock));
  }

  ngOnDestroy(): void {
    this.subscriptionHandler?.unsubscribe();
  }

  createStockElement() {
    const dialogRef = this.matDialog.open(AddResourceDialogComponent, {
      data: { resource: '', unit: '' },
      width: '60%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.resource && result?.unit) {
        this.store.dispatch(
          addStockResource({
            name: result.resource,
            unit: result.unit,
          })
        );
      }
    });
  }

  searchResources() {
    this.store.dispatch(setFilterText({ filter: this.searchValue }));
  }

  updateResource(resource: { stock: StockResource; amount: number }) {
    this.store.dispatch(
      updateStockResourceAmount({
        id: resource.stock.id,
        amount: resource.amount,
      })
    );
  }

  deleteResource(resource: StockResource) {
    this.store.dispatch(deleteStockResource({ id: resource.id }));
  }
}
