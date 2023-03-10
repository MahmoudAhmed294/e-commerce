using Api.Data;
using Api.Dto;
using Api.Entities;
using Api.Helpers;
using Api.interfaces;
using AutoMapper;

namespace Api.Controllers
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        public Task<bool> AddProductToUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Product> GetProductAsync(int id)
        {

            return await _context.Products.FindAsync(id);
        }

        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var productsQuery = _context.Products.AsQueryable();

            var products = productsQuery.Select(p => new ProductDto
            {
                Name = p.Name,
                Category = p.Category,
                Img = p.Img,
                Price = p.Price,
                Id = p.Id
            });

            return await PagedList<ProductDto>.CreateAsync(products, productParams.pageNumber, productParams.PageSize);


        }

    }
}