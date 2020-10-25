 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Data.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }

        public int TicketId { get; set; }
    }
}
