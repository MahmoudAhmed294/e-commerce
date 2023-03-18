using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/dev-data/users.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<User>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }


            await context.SaveChangesAsync();

        }
        public static async Task SeedProducts(DataContext context)
        {
            if (await context.Products.AnyAsync()) return;

            var productsData = await File.ReadAllTextAsync("Data/dev-data/products.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var products = JsonSerializer.Deserialize<List<Product>>(productsData);

            foreach (var product in products)
            {

                context.Products.Add(product);
            }


            await context.SaveChangesAsync();

        }
    }
}