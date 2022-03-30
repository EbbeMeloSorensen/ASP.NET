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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Song>().HasData(
                new Song
                {
                    Id = 1,
                    Title = "Willow",
                    Language = "English",
                    Duration = "4:35"
                },
                new Song
                {
                    Id = 2,
                    Title = "Despacito",
                    Language = "Spanish",
                    Duration = "4:15"
                }
            );
        }
    }
}
