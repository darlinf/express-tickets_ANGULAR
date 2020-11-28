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
    [Authorize]
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
        public IActionResult Create(Ticket NewTicket)
        {
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
        public IActionResult GetAll(int Id)
        {
            try
            {
                var tickets = _ticketService.GetAll(Id);
                return Ok(tickets);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("GetById/{Id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var ticket = _ticketService.GetById(id);
                return Ok(ticket);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("GetAllBy/{Status}/{Id}")]
        public IActionResult GetAllBy(string Status, int Id)
        {
            try
            {
                var tickets = _ticketService.GetAllBy(Status, Id);
                return Ok(tickets);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                _ticketService.Delete(Id);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        public IActionResult Edit(Ticket editTicket)
        {
            try
            {
                _ticketService.Edit(editTicket);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("SendMail")]
        public IActionResult SendMail(MailModel Mail)
        {
            try
            {
                _ticketService.SendMail(Mail.EmailDestination, Mail.Body);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("EditList")]
        public IActionResult EditList(IEnumerable<Ticket> editTicket)
        {
            try
            {
                _ticketService.EditList(editTicket);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
