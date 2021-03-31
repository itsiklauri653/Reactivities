using Reactivities.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title="Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub"
                },

                new Activity
                {
                    Title="Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another Pub"
                },

                new Activity
                {
                    Title="Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 months in the Future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub"
                },
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
