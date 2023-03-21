using Api.Data;
using Api.Dto;
using Api.Entities;
using Api.Extensions;
using Api.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]

    public class OrderController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IOrderRepository _orderRepository;
        public OrderController(DataContext context, IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> AddProductToOrder(OrderDto orderDto)
        {
            var userId = User.GetUserId();

            var isOrderAdded = await _orderRepository.AddOrder(userId, orderDto);

            if (!isOrderAdded) return BadRequest();



            return Ok(isOrderAdded);


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteOrder(int id)
        {
            var userId = User.GetUserId();

            var isOrderDeleted = await _orderRepository.DeleteOrder(userId, id);

            if (!isOrderDeleted) return BadRequest();



            return Ok(isOrderDeleted);


        }
        [HttpGet]
        public async Task<ActionResult<List<GetOrderDto>>> GetAllOrder()
        {
            var userId = User.GetUserId();

            var Orders = await _orderRepository.GetAllOrder(userId);

            if (Orders == null) return BadRequest();

            return Ok(Orders);


        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GetOrderDto>> GetOrder(int id)
        {
            var userId = User.GetUserId();

            var Order = await _orderRepository.GetOrder(userId, id);

            if (Order == null) return BadRequest();

            return Ok(Order);


        }


    }
}