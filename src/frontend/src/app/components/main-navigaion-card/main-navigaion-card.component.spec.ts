import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigaionCardComponent } from './main-navigaion-card.component';

describe('MainNavigaionCardComponent', () => {
  let component: MainNavigaionCardComponent;
  let fixture: ComponentFixture<MainNavigaionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavigaionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavigaionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
