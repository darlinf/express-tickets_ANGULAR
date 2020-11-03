using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Atiendeme.Data.Interfaces;
using WebApi.Entities;
using WebApi.Models;
using Atiendeme.Data.Entities;
using WebApi.Dtos;
using AutoMapper;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using express_tickets.Data.Entities;

namespace WebApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
       
        private ITicketService _ticketService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public TicketController(
            ITicketService ticketService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _ticketService = ticketService;
        }

        [HttpPost]
        public IActionResult Create(Ticket NewTicket){
            try
            {
                // save 
                _ticketService.Create(NewTicket);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll(){
            var tickets = _ticketService.GetAll();
            return Ok(tickets);
        }
        
    }
}
   