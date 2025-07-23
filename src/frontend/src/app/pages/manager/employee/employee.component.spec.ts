import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeePageComponent;
  let fixture: ComponentFixture<EmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
