using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
  

    public class TicketService : ITicketService
    {
        DataContext _context;
        public TicketService(DataContext context)
        {
            _context = context;
        }

        public void ChangeStatus(TicketChangeStatus ticketChangeStatus)
        {
            for(var i = 0; i < ticketChangeStatus.Items.Length; i++)
            {
                var ticket = _context.Tickets.FirstOrDefault(x => x.Id == ticketChangeStatus.Items[i]);
                if (ticket == null) continue;
                else
                {
                    ticket.Status = ticketChangeStatus.Status;
                    _context.Tickets.Update(ticket);
                }
            }
        }

        public void Create(Ticket newTicket)
        {
            _context.Add(newTicket);
            _context.SaveChanges();
        }

        public void Delete(int Id)
        {
            var ticket = _context.Tickets.Find(Id);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                _context.SaveChanges();
            }
        }

        public void EditList(IEnumerable<Ticket> ticketToEdit)
        {
            _context.UpdateRange(ticketToEdit);
            _context.SaveChanges();
        }
        
        public void Edit(Ticket ticketToEdit)
        {
            _context.Entry(ticketToEdit).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public IEnumerable<Ticket> GetAll(int Id)
        {
            return _context.Tickets.Where(x => x.UserId == Id);
        }

        public IEnumerable<Ticket> GetAllBy(string Status, int Id)
        {
            return _context.Tickets.Where(x => x.Status == Status && x.UserId == Id);
        }

        public Ticket GetById(int id)
        {
            return _context.Tickets.FirstOrDefault(x => x.Id == id);
        }

        public void SendMail(string EmailDestination, string Body)
        {
            string EmailOrigin = "ticketexpress053@gmail.com";
            string Password = "Darlin2020";

            MailMessage oMailMessage = new MailMessage(EmailOrigin, EmailDestination, "Factura Ticket Express", Body);

            oMailMessage.IsBodyHtml = true;

            SmtpClient oSmtpClient = new SmtpClient("smtp.gmail.com");
            oSmtpClient.EnableSsl = true;
            oSmtpClient.UseDefaultCredentials = false;
            oSmtpClient.Host = "smtp.gmail.com";
            oSmtpClient.Port = 587;
            oSmtpClient.Credentials = new NetworkCredential(EmailOrigin, Password);

            oSmtpClient.Send(oMailMessage);
            oSmtpClient.Dispose();
        }
    }
}