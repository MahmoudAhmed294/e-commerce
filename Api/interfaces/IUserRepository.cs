using Api.Dto;
using Api.Entities;

namespace Api.interfaces
{
    public interface IUserRepository
    {
        public Task<User> GetUser(int id);
    }
}