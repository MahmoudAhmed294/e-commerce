namespace Api.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal Rating { get; set; }
        public int Stock { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }


        public List<Image> Images { get; set; } = new();
        public ICollection<CartProducts> CartProducts { get; set; } // Navigation property
        public ICollection<OrderProducts> OrderProducts { get; set; } // Navigation property


    }
}