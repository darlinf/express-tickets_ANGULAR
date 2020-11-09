using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Atiendeme.Data;
using Atiendeme.Data.Entities;
using Atiendeme.Data.Interfaces;
using express_tickets.Data.Entities;
using express_tickets.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public class TicketManagementService : ITicketManagementService
    {
        DataContext _context;
        public TicketManagementService(DataContext context)
        {
            _context = context;
        }

        public void CancelBus(int Number)
        {
            var bus = _context.Buses.FirstOrDefault(x => x.Number == Number);
            if(bus != null){
                var ticket = _context.Tickets.Where(x => x.BusId == bus.Id).ToList();
                ticket.ForEach(x => x.Status = TicketStatus.refund);
                _context.UpdateRange(ticket);
                _context.SaveChanges();
            }
        }

        public void ChangeUserRol(string mail)
        {
            var user = _context.Users.FirstOrDefault(x => x.Mail == mail);
            if(user != null){
                user.Role = Role.Admin;
                _context.Update(user);
                _context.SaveChanges();
            }
        }

        public void RedeemTicket(int code)
        {
            var ticket = _context.Tickets.FirstOrDefault(x => x.Code == code);
            if(ticket != null){
                ticket.Status = TicketStatus.Used;
                _context.Update(ticket);
                _context.SaveChanges();
            }
        }
    }
}