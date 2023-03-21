using Api.Dto;
using Api.Entities;
using Api.Helpers;

namespace Api.interfaces
{
    public interface ICartRepository
    {
        Task<bool> AddProductToCart(User user, int productId);
        Task<bool> UploadProductInCart(User user, int productId, int quantity);
        Task<int> GetCartSize(int userId);
        Task<bool> DeleteCartProduct(int productId, int userId);
        Task<bool> DeleteAllCartProduct(int userId);
        Task<PagedList<CartDto>> GetCartProducts(ProductParams productParams, int userId);
        Task<bool> CartTotal(User user);

        Task<bool> SaveAllAsync();

    }
}