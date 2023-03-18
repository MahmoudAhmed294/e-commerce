


using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }


        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CartProducts> CartProducts { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<CartProducts>().HasKey(k => new { k.CartId, k.ProductId });
            builder.Entity<OrderProducts>().HasKey(k => new { k.OrderId, k.ProductId });

        }
    }
}