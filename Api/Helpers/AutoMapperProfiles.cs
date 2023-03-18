using Api.Dto;
using Api.Entities;
using AutoMapper;

namespace Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<Product, ProductDto>();
            CreateMap<Image, ImageDto>();
            CreateMap<Product, ProductDetailsDto>();
            CreateMap<Product, CartDto>();
            CreateMap<Address, AddressDto>();
            CreateMap<UpdatedAddressDto, Address>();

        }
    }
}