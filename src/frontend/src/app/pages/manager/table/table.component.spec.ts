import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageComponent } from './table.component';

describe('TableComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
