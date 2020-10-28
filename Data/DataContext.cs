using Atiendeme.Data.Entities;
using express_tickets.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Atiendeme.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
    }
}
