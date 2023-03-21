using Api.Dto;
using Api.Entities;

namespace Api.interfaces
{
    public interface IOrderRepository
    {
        Task<bool> AddOrder(int userId, OrderDto orderDto);
        Task<GetOrderDto> GetOrder(int userId, int orderId);
        Task<List<GetOrderDto>> GetAllOrder(int userId);

        Task<bool> DeleteOrder(int userId, int orderId);
        Task<bool> SaveOrder();
    }
}