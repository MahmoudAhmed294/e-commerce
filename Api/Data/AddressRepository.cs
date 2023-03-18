using Api.Dto;
using Api.Entities;
using Api.interfaces;
using AutoMapper;

namespace Api.Data
{
    public class AddressRepository : IAddressRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public AddressRepository(DataContext context, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> AddAddress(AddressDto address, int userId)
        {
            var user = await _userRepository.GetUser(userId);


            var Address = new Address
            {
                UserAddress = address.UserAddress,
                City = address.City,
                Phone = address.Phone,
                Country = address.Country,
            };
            var currentMain = user.Address.FirstOrDefault(x => x.IsMain);

            if (currentMain == null) Address.IsMain = true;

            user.Address.Add(Address);

            return await SaveAddress();

        }


        public async Task<AddressDto> GetMainAddress(int userId)
        {
            var user = await _userRepository.GetUser(userId);

            var userAddress = user.Address.FirstOrDefault(x => x.IsMain);

            return _mapper.Map<AddressDto>(userAddress);
        }

        public async Task<AddressDto> GetAddress(int id, int userId)
        {
            var user = await _userRepository.GetUser(userId);

            var address = user.Address.FirstOrDefault(x => x.Id == id);

            return _mapper.Map<AddressDto>(address);

        }
        public async Task<List<AddressDto>> GetAllAddress(int userId)
        {
            var user = await _userRepository.GetUser(userId);


            var address = user.Address.ToList();

            var addressList = _mapper.Map<List<AddressDto>>(address);

            return addressList;

        }
        public async Task<bool> DeleteAddress(int id, int userId)
        {
            var user = await _userRepository.GetUser(userId);

            var address = user.Address.FirstOrDefault(x => x.Id == id);


            if (address != null)
            {
                user.Address.Remove(address);
            }


            return await SaveAddress();

        }


        public async Task<bool> UpdateAddress(int userId, int addressId, UpdatedAddressDto address)
        {
            var user = await _userRepository.GetUser(userId);

            var targetAddress = user.Address.FirstOrDefault(x => x.Id == addressId);

            if (targetAddress == null) return false;

            _mapper.Map(address, targetAddress);
            return await SaveAddress();


        }
        public async Task<bool> SetMainAddress(int userId, int addressId)
        {
            var user = await _userRepository.GetUser(userId);

            var mainAddress = user.Address.FirstOrDefault(x => x.IsMain);

            if (mainAddress != null) mainAddress.IsMain = false;

            var targetAddress = user.Address.FirstOrDefault(x => x.Id == addressId);

            if (targetAddress != null) targetAddress.IsMain = true;

            return await SaveAddress();


        }
        public async Task<bool> SaveAddress()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}