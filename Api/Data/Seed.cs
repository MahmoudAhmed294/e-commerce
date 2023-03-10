using System.Text.Json;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Seed
    {
        public static async Task SeedProducts(DataContext context)
        {
            if (await context.Products.AnyAsync()) return;

            var productData = await File.ReadAllTextAsync("Data/data.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var products = JsonSerializer.Deserialize<List<Product>>(productData);

            foreach (var product in products)
            {
                context.Products.Add(product);
            }


            await context.SaveChangesAsync();

        }
    }
}