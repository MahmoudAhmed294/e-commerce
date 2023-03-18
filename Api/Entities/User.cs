namespace Api.Entities
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Order> Orders { get; set; } = new();
        public int CartId { get; set; }
        public Cart Cart { get; set; }  = new();
        public List<Address> Address {get; set;} = new();

    }
}