import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';
import { ComponentsModule } from '../../../components/component.module';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Table } from '../../../models/table.model';
import { AppState } from '../../../states/app.state';
import {
  getAllTables,
  addTable,
  deleteTable,
  setFilterText,
} from '../../../states/table/table.action';
import {
  selectFilteredTableList,
  selectMaxSeat,
} from '../../../states/table/table.selector';
import { AddTableDialogComponent } from '../../../components/dialogs/add-table-dialog/add-table-dialog.component';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-table',
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
    MatSliderModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TablePageComponent {
  filteredTables!: Table[];
  maxSeatNumber = 0;
  minSeatNumber = 0;
  minFilter = 0;
  maxFilter = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  private subscriptionHandler!: Subscription;
  constructor(
    private readonly matDialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTables());
    this.subscriptionHandler = this.store
      .select(selectFilteredTableList)
      .subscribe((tables) => {
        this.filteredTables = tables;
      });
    this.subscriptionHandler.add(
      this.store.select(selectMaxSeat).subscribe((res) => {
        this.maxSeatNumber = res;
        this.maxFilter = res;
        this.searchTable();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionHandler?.unsubscribe();
  }

  createTable() {
    const dialogRef = this.matDialog.open(AddTableDialogComponent, {
      data: '',
      width: '60%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          addTable({ name: result.name, seats: result.seats })
        );

        this.searchTable();
      }
    });
  }

  searchTable() {
    this.store.dispatch(
      setFilterText({ min: this.minFilter, max: this.maxFilter })
    );
  }

  deleteTable(tableId: string) {
    this.store.dispatch(deleteTable({ id: tableId }));
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
