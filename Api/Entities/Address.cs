namespace Api.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string UserAddress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public bool IsMain { get; set; }
        public string Phone { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

    }
}