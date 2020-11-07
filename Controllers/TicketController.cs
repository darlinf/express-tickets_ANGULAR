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
using System.Collections.Generic;

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

        [HttpGet("{Id}")]
        public IActionResult GetAll(int Id){
            var tickets = _ticketService.GetAll(Id);
            return Ok(tickets);
        }

        [HttpGet("GetById/{Id}")]
        public IActionResult GetById(int id){
            var ticket = _ticketService.GetById(id);
            return Ok(ticket);
        }
        
        [HttpGet("GetAllBy/{Status}/{Id}")]
        public IActionResult GetAllBy(string Status, int Id){
            var tickets = _ticketService.GetAllBy(Status, Id);
            return Ok(tickets);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id){
            _ticketService.Delete(Id);
            return Ok();
        }

        [HttpPut]
        public IActionResult Edit(Ticket editTicket){
            _ticketService.Edit(editTicket);
            return Ok();
        }

        [HttpPut("EditList")]
        public IActionResult EditList(IEnumerable<Ticket> editTicket){
            _ticketService.EditList(editTicket);
            return Ok();
        }
    }
}
   