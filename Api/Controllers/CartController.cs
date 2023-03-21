using Api.Data;
using Api.Dto;
using Api.Extensions;
using Api.Helpers;
using Api.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]

    public class CartController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ICartRepository _cartRepository;
        private readonly IUserRepository _userRepository;
        public CartController(DataContext context, ICartRepository cartRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _cartRepository = cartRepository;
            _context = context;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<bool>> AddProductToCart(int id)
        {
            var userId = User.GetUserId();

            var user = await _userRepository.GetUser(userId);

            var cart = await _cartRepository.AddProductToCart(user, id);

            if (!cart) return BadRequest();



            return Ok(cart);


        }
        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDto>>> GetCart([FromQuery] ProductParams productParams)
        {
            var userId = User.GetUserId();

            if (userId == null) return Unauthorized();

            var products = await _cartRepository.GetCartProducts(productParams, userId);

            Response.AddPaginationHeader(new PaginationHeader(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages));

            return Ok(products);

        }

        [HttpGet("size")]

        public async Task<ActionResult<int>> GetCartSize()
        {
            var userId = User.GetUserId();

            var count = await _cartRepository.GetCartSize(userId);

            return Ok(count);
        }
        [HttpDelete("{id}")]

        public async Task<ActionResult<int>> DeleteCartProduct(int id)
        {
            var userId = User.GetUserId();

            var product = await _cartRepository.DeleteCartProduct(id, userId);
            if (product) return Ok(product);

            return NotFound();
        }

        [HttpPut("{id}/quantity/{quantity}")]

        public async Task<ActionResult<bool>> UploadProductInCart(int id, int quantity)
        {
            var userId = User.GetUserId();

            if (quantity == 0) return NoContent();

            var user = await _userRepository.GetUser(userId);

            var isUpdate = await _cartRepository.UploadProductInCart(user, id, quantity);

            if (isUpdate) return Ok(isUpdate);

            return BadRequest("Cart not update");
        }

    }
}