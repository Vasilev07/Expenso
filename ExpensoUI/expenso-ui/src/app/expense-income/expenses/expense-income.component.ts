import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { isEqual } from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_FORMATS } from 'src/app/common/formats';
import { icons } from 'src/app/common/icons';
import { ICategory } from 'src/app/common/types/category.interface';
import { IExpenseIncomeData } from 'src/app/common/types/expense-income-data.interface';
import { ConfirmationDialogComponent } from 'src/app/core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { ExpenseIncomeDialogComponent } from 'src/app/core/expense-income-dialog/expense-income-dialog.component';

@Component({
  selector: 'app-expense-income',
  templateUrl: './expense-income.component.html',
  styleUrls: ['./expense-income.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ExpenseIncomeComponent implements OnInit {
  public date = new FormControl(moment());
  public expenses: any[] = [];
  public categories: any[] = [];
  public isExpense?: boolean = true;
  public expenseString = 'Expenses';
  public incomeString = 'Incomes';
  public balance?: number;
  
  constructor(private readonly http: HttpClient,
              public dialog: MatDialog,
              public readonly cdr: ChangeDetectorRef) {
  }

  public getAllExpenses(): void {
    this.http.get(`https://localhost:44314/api/${this.isExpense ? this.expenseString : this.incomeString}`).subscribe(expenses => {
      this.expenses = expenses as any;
    });

    this.getBalance();
  }

  public getAllCategoriesByType(): void {
    this.http.get('https://localhost:44314/api/Category').subscribe((categories: any) => {
      this.categories = categories.filter((cat: any) => cat.isExpense === this.isExpense);
      console.log(categories);
      console.log(this.categories);
    });
  }

  public getBalance(): void {
      this.http.get('https://localhost:44314/api/General').subscribe((balance: any) => {
          console.log('hehehh');
          this.balance = balance;
          this.cdr.detectChanges();
      });
  }

  public ngOnInit(): void {
      this.getAllExpenses();

      this.getAllCategoriesByType();
      this.getBalance();
  }

  // public chosenYearHandler(normalizedYear: Moment): void {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  // }

  // public chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }

  public onAdd(): void {
    const dialogRef = this.dialog.open(ExpenseIncomeDialogComponent, {
      width: '300px',
      data: { date: '', category: '',categories: this.categories, amount: '' }
    });

    dialogRef.afterClosed().subscribe((result: IExpenseIncomeData) => {
      console.log(result);

      if (result) {
        const test = {
          ...result,
          createdAt: new Date(
            result.createdAt.year(), 
            result.createdAt.month(), 
            result.createdAt.date(), 
            result.createdAt.hour(), 
            result.createdAt.minute()
          )
        };
        console.log(`https://localhost:44314/api/${this.isExpense ?  this.expenseString : this.incomeString}`);
        this.http.post(`https://localhost:44314/api/${this.isExpense ?  this.expenseString : this.incomeString}`, test).subscribe(() => {
          this.getAllExpenses();
        });
      }

      this.getBalance();
      this.cdr.detectChanges();
    });
  }

  public onEdit(expense: IExpenseIncomeData): void {
    const dialogRef = this.dialog.open(ExpenseIncomeDialogComponent, {
        width: '300px',
        data: { id: expense.id, isExpense: true, date: expense.createdAt, category: expense.category, categories: this.categories, amount: expense.amount }
    });

    dialogRef.afterClosed().subscribe((result: IExpenseIncomeData) => {
      if (result) {
        const expense = this.expenses.find((exp: IExpenseIncomeData) => exp.id === result.id);
        const hasChange = !isEqual(expense, result);
        if (hasChange) {
          this.http.put(`https://localhost:44314/api/${this.isExpense ?  this.expenseString : this.incomeString}`, result).subscribe(() => {
            this.getAllExpenses();
          });
        }
      }

      this.getBalance();
      this.cdr.detectChanges();
    });
  }

  public onDelete(expense: IExpenseIncomeData): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { name: expense.category.name, id: expense.id }
	  });
	
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(`https://localhost:44314/api/${this.isExpense ?  this.expenseString : this.incomeString}/${result}`).subscribe(() => {
          this.getAllExpenses();
        });
      }

      this.getBalance();
      this.cdr.detectChanges();
    });
  }

  public onToggleChange(change: MatSlideToggleChange): void {
    this.isExpense = !change.checked;
    this.getAllExpenses();
    this.getAllCategoriesByType();
  }

  public getIconName(name: string): string {
    return icons[name];
  }
}
