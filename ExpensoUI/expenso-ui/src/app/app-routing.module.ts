import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseIncomeComponent } from './expense-income/expenses/expense-income.component';

const routes: Routes = [
  {
    path: 'expenses',
    component: ExpenseIncomeComponent,
  },
  { path: '',
    redirectTo: '/expenses',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
