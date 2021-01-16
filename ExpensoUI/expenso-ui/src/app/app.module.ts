import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseIncomeDialogComponent } from './core/expense-income-dialog/expense-income-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ExpenseIncomeComponent } from './expense-income/expenses/expense-income.component';
import { ConfirmationDialogComponent } from './core/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseIncomeComponent,
    ExpenseIncomeDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [],
  entryComponents: [ ExpenseIncomeDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
