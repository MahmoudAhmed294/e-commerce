using Api.Dto;
using Api.Entities;

namespace Api.interfaces
{
    public interface IUserRepository
    {
        public Task<AppUser> GetUser(int id);
    }
}