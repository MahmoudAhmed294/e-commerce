namespace Api.Entities
{
    public class OrderProducts
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public int Quantity { get; set; }
        public Order Order { get; set; }

    }
}