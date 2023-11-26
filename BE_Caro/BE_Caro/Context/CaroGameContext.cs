using BE_Caro.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Caro.Context
{
    public class CaroGameContext : DbContext
    {
        public CaroGameContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Room> rooms { get; set; }
        public DbSet<User> uses { get; set; }
    }
}
