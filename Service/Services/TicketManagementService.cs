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
            if(bus == null) throw new AppException("Bus no encontrado");
            if(bus.Status == BusStatus.Cancel) throw new AppException("El bus ya ha sido cancelado");

            var ticket = _context.Tickets.Where(x => x.BusId == bus.Id).ToList();
            bus.Status = BusStatus.Cancel;
            ticket.ForEach(x => x.Status = TicketStatus.refund);
            _context.UpdateRange(ticket);
            _context.SaveChanges();
            
        }

        public void ChangeUserRol(string mail)
        {
            var user = _context.Users.FirstOrDefault(x => x.Mail == mail);
            if(user == null) throw new AppException("Usuario no encontrado");
            if(user.Role == Role.Admin) throw new AppException("El usuario ya es administrador");

            user.Role = Role.Admin;
            _context.Update(user);
            _context.SaveChanges();
            
        }

        public void RedeemTicket(int code)
        {
            var ticket = _context.Tickets.FirstOrDefault(x => x.Code == code);

            if(ticket == null) throw new AppException("Ticket no encontrado");
            if(ticket.Status == TicketStatus.Used) throw new AppException("Ticket ya ha sido usado");

            ticket.Status = TicketStatus.Used;
            _context.Update(ticket);
            _context.SaveChanges();
            
        }
    }
}