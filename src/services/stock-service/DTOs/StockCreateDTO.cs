using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using stock_service.Models;

namespace stock_service.DTO;

public class StockCreateDto
{
    [Required]
    [StringLength(maximumLength: 100, MinimumLength = 1)]
    [DefaultValue("")]
    public required string Name { get; set; }

    [Required]
    [EnumDataType(typeof(QuantityUnit))]
    public required QuantityUnit Unit { get; set; }
}
