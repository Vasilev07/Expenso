using ExpensoAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensoAPI.Services
{
    public interface IExpensoRepository
    {
        public void AddExpense(Expense expense);
        public IEnumerable<Expense> GetAllExpenses();
        public void AddCategory(Category category);
        public Category GetCategory(int id);
        public IEnumerable<Category> GetAllCategories();
    }
}
