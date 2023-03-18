using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class CartProducts
    {
        public int CartId { get; set; }
        public Cart Cart { get; set; } // Navigation property
        public int ProductId { get; set; }
        public Product Product { get; set; } // Navigation property

        public int Quantity { get; set; }

    }
}