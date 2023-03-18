using Api.Dto;
using Api.Helpers;

namespace Api.interfaces
{
    public interface ICartRepository
    {
        Task<bool> AddProductToCart(int ShoppingCartId ,int productId);
        Task<bool> UploadProductInCart(int ShoppingCartId ,int productId ,int quantity);
        Task<int> GetCartSize(int userId);
        Task<bool> DeleteCartProduct(int productId , int userId);
        Task<PagedList<CartDto>> GetCartProducts(ProductParams productParams , int userId);
        Task<bool> SaveAllAsync();

    }
}