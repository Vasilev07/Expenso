import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_FORMATS } from 'src/app/common/formats';
import { DialogComponent } from 'src/app/core/dialog-component/dialog-component.component';

interface Expense {
  name: string;
  categoryName: string;
  amount: number;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ExpensesComponent implements OnInit {
  public date = new FormControl(moment());
  public expenses: any[] = [];
  public categories: any[] = [];

  constructor(private readonly http: HttpClient,
              public dialog: MatDialog) {
  }

  public getAllExpenses(): void {
    this.http.get('https://localhost:44314/api/Expenses').subscribe(expenses => {
      console.log(expenses);
      this.expenses = expenses as any;
    });
  }

  public ngOnInit(): void {
      this.getAllExpenses();

      this.http.get('https://localhost:44314/api/Category').subscribe((categories) => {
        this.categories = categories as any;
      });
  }

  public chosenYearHandler(normalizedYear: Moment): void {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  public chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { date: '', category: this.categories, amount: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.http.post('https://localhost:44314/api/Expenses', result).subscribe(() => {
        this.getAllExpenses();
      });
    });
  }

  public onEdit(expense: any): void {
  console.log();
  const dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: { date: expense.createdAt, category: this.categories, amount: '' }
      });
  }

  public onDelete(): void {
  }
}
