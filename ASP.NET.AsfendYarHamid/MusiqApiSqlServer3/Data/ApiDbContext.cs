using Microsoft.EntityFrameworkCore;
using MusiqApiSqlServer3.Models;

namespace MusiqApiSqlServer3.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }
    }
}
