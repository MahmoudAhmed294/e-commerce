using Api.Entities;

namespace Api.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public int CartCount { get; set; }
    }
}