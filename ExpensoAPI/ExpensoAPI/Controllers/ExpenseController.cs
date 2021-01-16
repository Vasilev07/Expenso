using System;
using ExpensoAPI.Models;
using ExpensoAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensoAPI.Controllers
{
    [ApiController]
    [Route("api/Expenses")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpensoRepository expensoRepository;

        public ExpenseController(IExpensoRepository expenseRepository)
        {
            expensoRepository = expenseRepository;
        }

        // GET: ExpenseController
        [HttpGet]
        public ActionResult Index()
        {
            var expenses = expensoRepository.GetAllExpenses();

            return Ok(expenses);
        }

        // POST: ExpenseController/Create
        [HttpPost]
        public ActionResult CreateExpense([FromBody] Expense expense)
        {
            try
            {
                var category = expensoRepository.GetCategory(expense.CategoryId);
                expense.Category = category;
                expensoRepository.AddExpense(expense);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }

        [HttpPut]
        public ActionResult UpdateExpense([FromBody] Expense expense)
        {
            try
            {
                var oldExpense = expensoRepository.GetExpense(expense.Id);
                var category = expensoRepository.GetCategory(expense.CategoryId);

                if (oldExpense == null || category == null) return NotFound();

                oldExpense.CratedAt = expense.CratedAt;
                oldExpense.CategoryId = expense.CategoryId;
                oldExpense.Category = category;
                oldExpense.Amount = expense.Amount;

                expensoRepository.UpdateExpense(oldExpense);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteExpense(int id)
        {
            try
            {
                var expense = expensoRepository.GetExpense(id);

                if (expense == null) return NotFound();

                expensoRepository.DeleteExpense(expense);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }
    }
}