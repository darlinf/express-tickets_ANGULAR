using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace express_tickets.Models
{
    public class TicketModel
    {
        public int Id { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string Place { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public int Code { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
