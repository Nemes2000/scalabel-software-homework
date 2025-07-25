import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePageComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: SchedulePageComponent;
  let fixture: ComponentFixture<SchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
