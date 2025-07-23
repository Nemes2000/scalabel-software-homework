using AutoMapper;
using UserService.DTO;
using UserService.Models;

namespace UserService
{
    public class DtoMapperProfile : Profile
    {
        public DtoMapperProfile()
        {
            CreateMap<User, EmployeeGetDto>();
        }
    }
}
