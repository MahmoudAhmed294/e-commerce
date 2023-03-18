using Api.interfaces;

namespace Api.Data
{
    public class OrderRepository : IOrderRepository
    {
        public Task<int> SetAddress(int userId)
        {
            throw new NotImplementedException();
        }
    }
}