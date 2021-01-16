using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpensoAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensoAPI.Controllers
{
    [ApiController]
    [Route("api/General")]
    public class DataController : ControllerBase
    {
        private readonly IExpensoRepository expensoRepository;

        public DataController(IExpensoRepository expenseRepository)
        {
            expensoRepository = expenseRepository;
        }

        public ActionResult<int> GetBalance()
        {
            var balance = expensoRepository.GetBalance();

            return Ok(balance);
        }
    }
}
