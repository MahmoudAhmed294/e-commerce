using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
    [Table("Images")]

    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

    }
}