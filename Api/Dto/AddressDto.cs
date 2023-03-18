namespace Api.Dto
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string UserAddress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public bool IsMain { get; set; }

    }
}