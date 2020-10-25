using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Data.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }

        public int UserId { get; set; }
        public Invoice Invoice { get; set; }
    }
}
