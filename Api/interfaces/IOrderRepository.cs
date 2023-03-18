namespace Api.interfaces
{
    public interface IOrderRepository
    {
        Task<int> SetAddress(int userId);
    }
}