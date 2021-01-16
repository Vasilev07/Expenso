import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIncomeDialogComponent } from './expense-income-dialog.component';

describe('ExpenseIncomeDialogComponent', () => {
  let component: ExpenseIncomeDialogComponent;
  let fixture: ComponentFixture<ExpenseIncomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseIncomeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
