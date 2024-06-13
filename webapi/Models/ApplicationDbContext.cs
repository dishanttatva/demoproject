using Microsoft.EntityFrameworkCore;
namespace webapi.Models
{
    public class ApplicationDbContext:DbContext
    {   
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }
        public DbSet<Employee> Employees { get; set; }
    }
}