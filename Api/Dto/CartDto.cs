namespace Api.Dto
{
    public class CartDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public string Img { get; set; }

        public int Quantity { get; set; }
    }
}