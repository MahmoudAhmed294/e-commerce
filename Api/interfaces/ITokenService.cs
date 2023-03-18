using Api.Entities;

namespace Api.interfaces
{
    public interface ITokenService
    {
        string CreateToken(User users);
    }
}