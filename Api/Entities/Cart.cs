namespace Api.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }
        public int Size { get; set; }

        public ICollection<CartProducts> CartProducts { get; set; } // Navigation property

    }
}