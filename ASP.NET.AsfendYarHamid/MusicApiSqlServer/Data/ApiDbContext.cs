using Microsoft.EntityFrameworkCore;
using MusicApiSqlServer.Models;

namespace MusicApiSqlServer.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
                
        }
    }
}
