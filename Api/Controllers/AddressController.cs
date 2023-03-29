using Api.Data;
using Api.Dto;
using Api.Extensions;
using Api.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]

    public class AddressController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;

        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;
        public AddressController(
            DataContext context,
             ICartRepository cartRepository,
            IUserRepository userRepository,
         IAddressRepository addressRepository,
         IMapper mapper
         )
        {
            _addressRepository = addressRepository;
            _userRepository = userRepository;
            _context = context;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<AddressDto>> AddAddress(AddressDto address)
        {
            var userId = User.GetUserId();

            var newAddress = _addressRepository.AddAddress(address, userId);


            if (await newAddress) return Ok();


            return BadRequest("the address not saved ");
        }
        
        [HttpGet]
        public async Task<ActionResult<AddressDto>> GetMainAddress()
        {
            var userId = User.GetUserId();

            var newAddress = await _addressRepository.GetMainAddress(userId);

            return Ok(newAddress);


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDto>> GetAddress(int id)
        {
            var userId = User.GetUserId();

            var address = await _addressRepository.GetAddress(id, userId);

            return Ok(address);


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteAddress(int id)
        {
            var userId = User.GetUserId();

            var address = await _addressRepository.DeleteAddress(id, userId);

            return Ok(address);


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> UpdateAddress(int id, UpdatedAddressDto address)
        {
            var userId = User.GetUserId();

            var targeAddress = await _addressRepository.UpdateAddress(userId, id, address);

            return Ok(targeAddress);


        }

        [HttpPut("set-main-address/{id}")]
        public async Task<ActionResult<bool>> SetMainAddress(int id)
        {
            var userId = User.GetUserId();

            var targeAddress = await _addressRepository.SetMainAddress(userId, id);

            return Ok(targeAddress);


        }
        [HttpGet("all")]
        public async Task<ActionResult<List<AddressDto>>> GetAllAddress()
        {
            var userId = User.GetUserId();

            var address = await _addressRepository.GetAllAddress(userId);

            if (address.Count == 0)
            {
                return NoContent();
            }

            return Ok(address);

        }
    }
}