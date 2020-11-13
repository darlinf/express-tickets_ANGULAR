using Atiendeme.Data.Entities;
using express_tickets.Data.Entities;
using express_tickets.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Atiendeme.Data.Interfaces
{
    public interface ITicketService
    {
        void Create(Ticket newTicket);
        IEnumerable<Ticket> GetAll(int Id);
        IEnumerable<Ticket> GetAllBy(string status, int Id);
        void ChangeStatus(TicketChangeStatus ticketChangeStatus);
        void Delete(int Id);
        void EditList(IEnumerable<Ticket> ticketToEdit);
        void Edit(Ticket ticketToEdit);
        Ticket GetById(int id);
        void SendMail(string EmailDestination, string Body);
    }
}