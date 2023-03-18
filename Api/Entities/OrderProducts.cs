namespace Api.Entities
{
    public class OrderProducts
    {
        public int OrderId { get; set; }
        public Order Cart { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }

    }
}