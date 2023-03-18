using Api.Dto;

namespace Api.interfaces
{
    public interface IAddressRepository
    {
        Task<bool> AddAddress(AddressDto address, int id);
        Task<bool> UpdateAddress(int userId , int addressId,UpdatedAddressDto address);
        Task<AddressDto> GetMainAddress(int userId);
        Task<bool> SetMainAddress(int userId , int addressId);

        Task<AddressDto> GetAddress(int id , int userId);
        Task<bool> DeleteAddress(int id , int userId);
        Task<List<AddressDto>> GetAllAddress(int userId);
        Task<bool> SaveAddress();
    }
}