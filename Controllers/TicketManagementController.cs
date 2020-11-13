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
    [Authorize(Roles = Role.Admin)]
    [ApiController]
    [Route("[controller]")]
    public class TicketManagementController : ControllerBase
    {
       
        private ITicketManagementService _ticketManagementService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public TicketManagementController(
            ITicketManagementService ticketManagementService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _ticketManagementService = ticketManagementService;
        }

        [HttpGet("CancelBus/{Number}")]
        public IActionResult CancelBus(int Number)
        {
            try
            {
                _ticketManagementService.CancelBus(Number);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("ChangeUserRol/{mail}")]
        public IActionResult ChangeUserRol(string mail)
        {
            try
            {
                _ticketManagementService.ChangeUserRol(mail);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("RedeemTicket/{code}")]
        public IActionResult RedeemTicket(int code)
        {
            try
            {
                _ticketManagementService.RedeemTicket(code);
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