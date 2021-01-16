using ExpensoAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ExpensoAPI.Services
{
    public class ExpensoRepository : IExpensoRepository
    {
        private readonly Expenso _context;

        public ExpensoRepository(Expenso context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Categories
        public Category GetCategory(int id)
        {
            return (Category)_context.Category.FirstOrDefault((c) => c.Id == id);
        }

        public void AddCategory(Category category)
        {
            _context.Category.Add(category);
            _context.SaveChanges();
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _context.Category;
        }


        //Expenses
        public void AddExpense(Expense expense)
        {
            _context.Expense.Add(expense);
            _context.SaveChanges();
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expense.Include((e) => e.Category);
        }

        public void UpdateExpense(Expense expense)
        {
            _context.Update(expense);
            _context.SaveChanges();
        }

        public Expense GetExpense(int id)
        {
            return _context.Expense.FirstOrDefault((e) => e.Id == id);
        }

        public void DeleteExpense(Expense expense)
        {
            _context.Expense.Remove(expense);
            _context.SaveChanges();
        }

        // Incomes
        public void AddIncomes(Income income)
        {
            _context.Income.Add(income);
            _context.SaveChanges();
        }

        public IEnumerable<Income> GetAllIncomes()
        {
            return _context.Income.Include((e) => e.Category);
        }

        public void UpdateIncome(Income income)
        {
            _context.Update(income);
            _context.SaveChanges();
        }

        public Income GetIncome(int id)
        {
            return _context.Income.FirstOrDefault((i) => i.Id == id);
        }

        public void DeleteIncome(Income income)
        {
            _context.Income.Remove(income);
            _context.SaveChanges();
        }
    }
}
