using Api.Data;
using Api.Entities;
using Api.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly DataContext _context;
        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> AddProductToCart(int id)
        {
            var userId = User.GetUserId();

            var product = await _context.Products.FindAsync(id);


            if (product == null) return NotFound();

            var newCartItem = new Cart() { UserId = userId, ProductId = product.Id };

            var checkReaped = _context.Cart.AnyAsync(p => p.ProductId == product.Id && p.UserId == userId).Result;

            if (!checkReaped)
            {

                await _context.Cart.AddAsync(newCartItem);

                _context.SaveChanges();
            }
            else
            {
                return BadRequest("this item already added to cart");
            }

            return Ok();


        }
        [HttpGet]

        public async Task<ActionResult> GetCart()
        {
            var userId = User.GetUserId();


            var cart = _context.Cart.Where(c => c.UserId == userId).Select(p => p.Product).ToListAsync().Result;

            return Ok(cart);

        }

    }
}