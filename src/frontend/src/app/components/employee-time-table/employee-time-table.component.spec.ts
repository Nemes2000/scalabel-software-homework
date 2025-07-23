import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeTableComponent } from './employee-time-table.component';

describe('EmployeeTimeTableComponent', () => {
  let component: EmployeeTimeTableComponent;
  let fixture: ComponentFixture<EmployeeTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTimeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
