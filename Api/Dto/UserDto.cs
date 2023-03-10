using Api.Entities;

namespace Api.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public List<Order> Orders {get; set;}
        public List<Cart> Cart {get; set;}

    }
}