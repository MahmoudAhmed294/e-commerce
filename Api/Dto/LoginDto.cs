using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Api.Dto
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]

        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        [MaxLength(30)]
        public string Password { get; set; }

    }
}