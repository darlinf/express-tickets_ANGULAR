using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Data.Entities
{
    public class Bus
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public List<Ticket> Tickets {get; set;}
    }
}
