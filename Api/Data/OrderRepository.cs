using Api.Dto;
using Api.Entities;
using Api.interfaces;
using AutoMapper;

namespace Api.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly ICartRepository _cartRepository;

        public OrderRepository(DataContext context, IMapper mapper, IUserRepository userRepository, ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
            _userRepository = userRepository;
            _context = context;
            _mapper = mapper;

        }
        public async Task<bool> AddOrder(int userId, OrderDto orderDto)
        {
            var user = await _userRepository.GetUser(userId);

            if (user == null) return false;

            var cart = _context.CartProducts.Where(c => c.CartId == user.CartId);

            if (cart.Count() == 0) return false;

            var order = new Order
            {
                AddressId = orderDto.AddressId,
                PaymentMethod = orderDto.PaymentMethod,
                UserId = userId,
                Status = "Shipping",
                OrderDate = DateTime.Now,
                OrderProducts = new List<OrderProducts>(),
                total = 0,
                Quantity = cart.Count()
            };


            foreach (var item in cart)
            {
                var orderProducts = new OrderProducts
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                };


                order.OrderProducts.Add(orderProducts);
            }

            await _context.Orders.AddAsync(order);



            return await _cartRepository.DeleteAllCartProduct(userId);
        }

        public async Task<bool> DeleteOrder(int userId, int orderId)
        {
            var user = await _userRepository.GetUser(userId);

            if (user == null) return false;

            var targetOrder = user.Orders.FirstOrDefault(s => s.Id == orderId);


            if (targetOrder == null) return false;

            _context.Orders.Remove(targetOrder);


            return await SaveOrder();

        }

        public async Task<List<GetOrderDto>> GetAllOrder(int userId)
        {
            var user = await _userRepository.GetUser(userId);

            if (user == null) return null;

            var orders = user.Orders.ToList();


            if (orders == null) return null;


            return _mapper.Map<List<GetOrderDto>>(orders);
        }

        public async Task<GetOrderDto> GetOrder(int userId, int orderId)
        {
            var user = await _userRepository.GetUser(userId);

            if (user == null) return null;

            var order = user.Orders.FirstOrDefault(u => u.Id == orderId);


            if (order == null) return null;



            return _mapper.Map<GetOrderDto>(order);
        }

        public async Task<bool> SaveOrder()
        {
            return _context.SaveChanges() > 0;
        }
    }
}