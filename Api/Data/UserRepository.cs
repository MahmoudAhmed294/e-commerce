using Api.Entities;
using Api.interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p => p.Address).Include(c => c.Cart).Include(o => o.Orders).SingleOrDefaultAsync(u => u.Id == id);
        }

    }
}