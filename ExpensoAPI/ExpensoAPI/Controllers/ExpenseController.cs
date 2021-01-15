using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpensoAPI.Models;
using ExpensoAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpensoAPI.Controllers
{
    [ApiController]
    [Route("api/Expenses")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpensoRepository expenseRepository;

        public ExpenseController(IExpensoRepository expenseRepository)
        {
            this.expenseRepository = expenseRepository;
        }

        // GET: ExpenseController
        public ActionResult Index()
        {
            var expenses = expenseRepository.GetAllExpenses();

            return Ok(expenses);
        }

       

        // POST: ExpenseController/Create
        [HttpPost]
        public ActionResult CreateExpense([FromBody] Expense expense)
        {
            try
            {
                var category = expenseRepository.GetCategory(expense.CategoryId);
                expense.Category = category;
                expenseRepository.AddExpense(expense);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }
    }
}