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
        IEnumerable<Ticket> GetAll();
        IEnumerable<Ticket> GetAllBy(string status);
        void ChangeStatus(TicketChangeStatus ticketChangeStatus);
        void Delete(int Id);
        void Edit(Ticket ticketToEdit);
        Ticket GetById(int id);
    }
}