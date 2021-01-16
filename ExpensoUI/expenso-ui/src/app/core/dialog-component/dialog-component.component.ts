import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MY_FORMATS, MY_FORMATS_WITH_DAY } from 'src/app/common/formats';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_WITH_DAY},
  ],
})
export class DialogComponent implements OnInit {
  public selected = new FormControl();
  public date = new FormControl(moment());
  public amount = new FormControl();
  public selectedData: {createdAt: Moment | null, categoryId: any, amount: number | null } = {
    createdAt: null,
    categoryId: null,
    amount: null
  };

  public constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
      this.selectedData.createdAt = moment();

      this.date.valueChanges.subscribe((date) => {
        console.log(date);
        this.selectedData.createdAt = date;
      });

      this.selected.valueChanges.subscribe((category) => {
        console.log(category);
        const foundCategory = this.data.category.find((cat: any) => cat.name === category)
        this.selectedData.categoryId = foundCategory.id;
      });

      this.amount.valueChanges.subscribe((amount) => {
        console.log(amount);
        this.selectedData.amount = parseInt(amount);
      });
  }
}
