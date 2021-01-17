using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensoAPI.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}
