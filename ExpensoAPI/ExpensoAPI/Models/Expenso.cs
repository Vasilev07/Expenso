using Microsoft.EntityFrameworkCore;

namespace ExpensoAPI.Models
{
    public class Expenso : DbContext
    {
        public Expenso(DbContextOptions<Expenso> options) : base(options)
        {
        }

        public DbSet<Expense> Expense { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}
