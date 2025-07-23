using AutoMapper;
using stock_service.DTO;
using stock_service.Models;

namespace stock_service
{
    public class DtoMapperProfile : Profile
    {
        public DtoMapperProfile()
        {
            CreateMap<StockCreateDto, Stock>();
        }
    }
}
