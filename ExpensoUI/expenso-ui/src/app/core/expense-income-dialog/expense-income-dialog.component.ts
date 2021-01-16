import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_FORMATS, MY_FORMATS_WITH_DAY } from 'src/app/common/formats';
import { ICategory } from 'src/app/common/types/category.interface';
import { IExpenseIncomeData } from 'src/app/common/types/expense-income-data.interface';

@Component({
  selector: 'app-expense-income-dialog-component',
  templateUrl: './expense-income-dialog.component.html',
  styleUrls: ['./expense-income-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_WITH_DAY},
  ],
})
export class ExpenseIncomeDialogComponent implements OnInit {
  public formGroup?: FormGroup;
  public selected?: FormControl;
  public date?: FormControl;
  public amount?: FormControl;

  public selectedData?: IExpenseIncomeData;

  public constructor(
    public dialogRef: MatDialogRef<ExpenseIncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
      this.formGroup = new FormGroup({
        selected: new FormControl(this.data.category.name || '', Validators.required),
        date: new FormControl(this.data.createdAt || moment(), Validators.required),
        amount: new FormControl(this.data.amount || '', Validators.required)
      });

      this.formGroup.valueChanges.subscribe((group) => {
        const foundCategory: ICategory = this.data.categories.find((cat: any) => cat.name === group.selected)
        this.selectedData = {
          id: this.data.id,
          createdAt: group.date,
          categoryId: foundCategory?.id,
          category: foundCategory,
          amount: group.amount,
        }
      });
  }
}
