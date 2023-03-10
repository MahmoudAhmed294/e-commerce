using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        [Key]
        [Column(Order = 1)]

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]

        public Product Product { get; set; }

    }
}