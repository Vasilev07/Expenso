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

        public void AddExpense(Expense expense)
        {
            _context.Expense.Add(expense);
            _context.SaveChanges();
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expense.Include((e) => e.Category);
        }

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
    }
}
