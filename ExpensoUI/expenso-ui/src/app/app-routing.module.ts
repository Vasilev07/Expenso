import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses/expenses.component';

const routes: Routes = [
  {
    path: 'expenses',
    component: ExpensesComponent,
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
