using Api.Data;
using Api.Dto;
using Api.Helpers;
using Api.interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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


        public async Task<ProductDetailsDto> GetProductAsync(int id)
        {
          var product =  await _context.Products.Include(p => p.Images).SingleOrDefaultAsync(p => p.Id == id);
            return _mapper.Map<ProductDetailsDto>(product);
        }

        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var productsQuery = _context.Products.AsQueryable();

            var products = productsQuery.Select(p => new ProductDto
            {
                Title = p.Title,
                Category = p.Category,
                Img = _mapper.Map<ImageDto>(p.Images.FirstOrDefault(i => i.IsMain)).Url,
                Price = p.Price,
                Id = p.Id
            });

            return await PagedList<ProductDto>.CreateAsync(products, productParams.pageNumber, productParams.PageSize);


        }

    }
}