using ExpensoAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensoAPI.Services
{
    public interface IExpensoRepository
    {
        // Category
        public void AddCategory(Category category);
        public Category GetCategory(int id);
        public IEnumerable<Category> GetAllCategories();


        // Expenses
        public void AddExpense(Expense expense);
        public IEnumerable<Expense> GetAllExpenses(DateTime date);
        
        public void UpdateExpense(Expense expense);

        public Expense GetExpense(int id);
        public void DeleteExpense(Expense expense);

        // Incomes
        public void AddIncomes(Income income);
        public IEnumerable<Income> GetAllIncomes(DateTime date);
        public void UpdateIncome(Income income);

        public Income GetIncome(int id);
        public void DeleteIncome(Income income);

        // general
        public int GetBalance();
    }
}
