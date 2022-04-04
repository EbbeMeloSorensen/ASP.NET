using Microsoft.EntityFrameworkCore;
using MusicApiPostgreSql.Models;

namespace MusicApiPostgreSql.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }
    }
}
