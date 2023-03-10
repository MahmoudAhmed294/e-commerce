namespace Api.Entities
{
    public class AppUser
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Order> Orders { get; set; }

    }
}