using AutoMapper;
using food_service.DTOs;
using food_service.Models;


namespace stock_service
{
    public class DtoMapperProfile : Profile
    {
        public DtoMapperProfile()
        {
            CreateMap<FoodCreateDto, Food>();
            CreateMap<FoodUpdateDto, Food>();
        }
    }
}
