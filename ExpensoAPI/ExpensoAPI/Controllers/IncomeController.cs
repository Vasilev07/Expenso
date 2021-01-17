using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpensoAPI.Models;
using ExpensoAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensoAPI.Controllers
{
    [ApiController]
    [Route("api/Incomes")]
    public class IncomeController : ControllerBase
    {
        private readonly IExpensoRepository expensoRepository;

        public IncomeController(IExpensoRepository expenseRepository)
        {
            expensoRepository = expenseRepository;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var expenses = expensoRepository.GetAllIncomes();

            return Ok(expenses);
        }

        [HttpPost]
        public ActionResult AddIncome([FromBody] Income income)
        {
            var category = expensoRepository.GetCategory(income.CategoryId);

            if (category == null) return NotFound();

            income.Category = category;
            expensoRepository.AddIncomes(income);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateIncome([FromBody] Income income)
        {
            try
            {
                var oldIncome = expensoRepository.GetIncome(income.Id);
                var category = expensoRepository.GetCategory(income.CategoryId);

                if (oldIncome == null || category == null) return NotFound();

                oldIncome.CreatedAt = income.CreatedAt;
                oldIncome.CategoryId = income.CategoryId;
                oldIncome.Category = category;
                oldIncome.Amount = income.Amount;

                expensoRepository.UpdateIncome(oldIncome);

                return Ok();
            } catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteIncome(int id)
        {
            try
            {
                var income = expensoRepository.GetIncome(id);

                if (income == null) return NotFound();

                expensoRepository.DeleteIncome(income);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }
    }
}
