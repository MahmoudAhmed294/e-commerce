using Api.Dto;
using Api.Entities;
using Api.Helpers;
using Api.interfaces;
using AutoMapper;

namespace Api.Data
{
    public class CartRepository : ICartRepository

    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        public CartRepository(DataContext context, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _context = context;
            _mapper = mapper;

        }

        public async Task<bool> UploadProductInCart(int ShoppingCartId, int productId, int quantity)
        {
            var cartItem = _context.CartProducts.SingleOrDefault(c => c.CartId == ShoppingCartId && c.ProductId == productId);

            if (cartItem == null) return false;

            cartItem.Quantity = quantity;

            return await SaveAllAsync();

        }
        public async Task<bool> AddProductToCart(int ShoppingCartId, int productId)
        {
            var cartItem = _context.CartProducts.SingleOrDefault(
                c => c.CartId == ShoppingCartId
                && c.ProductId == productId);

            if (cartItem == null)
            {
                cartItem = new CartProducts
                {
                    ProductId = productId,
                    CartId = ShoppingCartId,
                    Quantity = 1,
                };

                _context.CartProducts.Add(cartItem);
            }
            else
            {
                cartItem.Quantity++;
            }

            return await _context.SaveChangesAsync() > 0;

        }

        public async Task<bool> DeleteCartProduct(int productId, int userId)
        {
            var user = await _userRepository.GetUser(userId);


            var cartProduct = _context.CartProducts.FirstOrDefault(cp => cp.ProductId == productId && cp.CartId == user.CartId);

            if (cartProduct != null)
            {
                _context.CartProducts.Remove(cartProduct);
            }


            return await SaveAllAsync();



        }

        public async Task<PagedList<CartDto>> GetCartProducts(ProductParams productParams, int userId)
        {
            var user = await _userRepository.GetUser(userId);

            var cartsQuery = _context.CartProducts.AsQueryable();


            var cart = cartsQuery.Where(c => c.CartId == user.CartId);

            var products = cart.Select(p => new
            {
                p.Product,
                p.Quantity,
            }
             );

            var productsList = products.Select(p => new CartDto
            {

                Title = p.Product.Title,
                Img = p.Product.Images.FirstOrDefault(p => p.IsMain).Url,
                Price = p.Product.Price,
                Category = p.Product.Category,
                Id = p.Product.Id,
                Quantity = p.Quantity
            });


            return await PagedList<CartDto>.CreateAsync(productsList, productParams.pageNumber, productParams.PageSize);


        }


        public async Task<int> GetCartSize(int userId)
        {
            var user = await _userRepository.GetUser(userId);

            var cartsQuery = _context.CartProducts.AsQueryable();

            return cartsQuery.Where(c => c.CartId == user.CartId).Count();


        }
        public async Task<bool> SaveAllAsync()
        {
            return _context.SaveChanges() > 0;
        }
    }
}