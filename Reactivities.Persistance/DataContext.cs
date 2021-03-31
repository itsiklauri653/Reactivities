using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reactivities.Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
    }
}
