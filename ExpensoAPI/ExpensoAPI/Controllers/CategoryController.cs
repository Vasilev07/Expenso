using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ExpensoAPI.Models;
using ExpensoAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExpensoAPI.Controllers
{
    [ApiController]
    [Route("api/Category")]
    public class CategoryController : ControllerBase
    {
        private readonly IExpensoRepository expenseRepository;

        public CategoryController(IExpensoRepository expenseRepository)
        {
            this.expenseRepository = expenseRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Category>> Index()
        {
            try
            {
                return Ok(expenseRepository.GetAllCategories());
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }

        [HttpPost]
        public ActionResult<Category> Index([FromBody] Category category)
        {
            try
            {
                category.CratedAt = DateTime.Now;
                category.UpdatedAt = DateTime.Now;
                expenseRepository.AddCategory(category);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "DB Failiure");
            }
        }
    }
}
