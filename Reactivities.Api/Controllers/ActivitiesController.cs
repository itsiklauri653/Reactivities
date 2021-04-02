using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities.Queries;
using Reactivities.Application.Activities.Commands;
using Reactivities.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reactivities.Api.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(int id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
