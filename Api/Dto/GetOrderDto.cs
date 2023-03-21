namespace Api.Dto
{
    public class GetOrderDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int AddressId { get; set; }


        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; } 

        public decimal total { get; set; }

        public string Status { get; set; }
        public string PaymentMethod { get; set; }

    }
}