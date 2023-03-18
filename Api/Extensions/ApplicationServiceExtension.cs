using Api.Controllers;
using Api.Data;
using Api.interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.service
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection ApplicationService(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options => options.UseMySQL(config.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Repository 
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();



            return services;
        }
    }
}