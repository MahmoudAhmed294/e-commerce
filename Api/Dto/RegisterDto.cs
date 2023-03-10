using System.ComponentModel.DataAnnotations;

namespace Api.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(50)]

        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        [MaxLength(30)]

        public string Password { get; set; }
    }
}