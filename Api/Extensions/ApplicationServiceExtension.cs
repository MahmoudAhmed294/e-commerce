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
            services.AddDbContext<DataContext>(options => options.UseMySQL(config.GetConnectionString("DefaultConnection")));
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IProductsRepository , ProductsRepository>();
            services.AddScoped<IUserRepository , UserRepository>();



            return services;
        }
    }
}