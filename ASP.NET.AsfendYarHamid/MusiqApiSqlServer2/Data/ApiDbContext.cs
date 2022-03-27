using Microsoft.EntityFrameworkCore;
using MusiqApiSqlServer2.Models;

namespace MusiqApiSqlServer2.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }
    }
}
