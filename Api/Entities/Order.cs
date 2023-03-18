namespace Api.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public ICollection<OrderProducts> OrderProducts { get; set; } // Navigation property

        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal total { get; set; }

        public string Status { get; set; }
        public string PaymentMethod { get; set; }


    }
}