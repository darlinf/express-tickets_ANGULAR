using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Dtos
{
    public class TicketChangeStatus
    {
        public string Status { get; set; }
        public int [] Items { get; set; }
    }
}
