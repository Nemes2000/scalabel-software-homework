using AutoMapper;
using schedule_service.DTO;
using schedule_service.Models;

namespace schedule_service
{
    public class DtoMapperProfile : Profile
    {
        public DtoMapperProfile()
        {
            CreateMap<ScheduleCreateDto, Schedule>();
            CreateMap<Schedule,ScheduleGetDto>();
        }
    }
}
