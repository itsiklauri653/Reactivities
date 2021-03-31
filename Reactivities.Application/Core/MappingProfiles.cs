using AutoMapper;
using Reactivities.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Reactivities.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}
