using Api.Data;
using Api.Dto;
using Api.Extensions;
using Api.Helpers;
using Api.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IProductsRepository _productsRepository;
        private readonly IUserRepository _userRepository;
        public ProductsController(DataContext context, IMapper mapper, IProductsRepository productsRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _productsRepository = productsRepository;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        
        public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery] ProductParams userParams)
        {
            var products = await _productsRepository.GetProductsAsync(userParams);

            Response.AddPaginationHeader(new PaginationHeader(products.CurrentPage,
            products.PageSize, products.TotalCount, products.TotalPages
            ));

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(int id)
        {
            var products = await _productsRepository.GetProductAsync(id);

            if (products != null) return Ok(products);

            return BadRequest();

        }
    }
}