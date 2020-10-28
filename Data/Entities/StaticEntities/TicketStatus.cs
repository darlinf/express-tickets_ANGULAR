using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Data.Entities
{
    public static class TicketStatus
    {
        public const string Paid = "Paid";
        public const string Pending = "Pending";
        public const string Used = "Used";
        public const string refund = "Refund";
    }
}
