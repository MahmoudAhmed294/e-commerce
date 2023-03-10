namespace Api.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } =DateTime.UtcNow;
        public string Category { get; set; }
        public string Price { get; set; }
        public string Img { get; set; }
        public int Quantity { get; set; }
        public int Rating { get; set; }
        
        
    }
}