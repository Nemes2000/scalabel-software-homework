import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPageComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockPageComponent;
  let fixture: ComponentFixture<StockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
