using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace stock_service.DTO
{
    public class StockUpdateDto
    {
        [Required]
        [Range(0, int.MaxValue)]
        [DefaultValue(0)]
        public required int Amount { get; set; }
    }
}
