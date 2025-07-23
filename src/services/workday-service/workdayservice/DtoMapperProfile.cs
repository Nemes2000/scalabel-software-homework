using AutoMapper;
using workday_service.DTO;
using workday_service.Models;

namespace workday_service
{
    public class DtoMapperProfile : Profile
    {
        public DtoMapperProfile()
        {
            CreateMap<WorkdayCreateDto, Workday>();
            CreateMap<WorkdayUpdateDto, Workday>();
            CreateMap<Workday, WorkdayGetDto>();
        }
    }
}
