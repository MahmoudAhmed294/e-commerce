using Api.Dto;
using Api.Entities;
using Api.Helpers;

namespace Api.interfaces
{
    public interface IProductsRepository
    {

        
        Task<Product> GetProductAsync(int id);
        Task<bool> AddProductToUserAsync(int id);
        Task<PagedList<ProductDto>> GetProductsAsync(ProductParams userParams);
        
    }
}