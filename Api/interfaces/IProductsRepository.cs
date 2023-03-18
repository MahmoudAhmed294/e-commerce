using Api.Dto;
using Api.Helpers;

namespace Api.interfaces
{
    public interface IProductsRepository
    {

        
        Task<ProductDetailsDto> GetProductAsync(int id);

        Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams);


    }
}