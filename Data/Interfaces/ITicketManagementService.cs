using Atiendeme.Data.Entities;
using express_tickets.Data.Entities;
using express_tickets.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Atiendeme.Data.Interfaces
{
    public interface ITicketManagementService
    {
        void CancelBus(int Number);
        void RedeemTicket(int code);
        void ChangeUserRol(string mail);
    }
}