namespace schedule_service.Validators;

using System;
using System.ComponentModel.DataAnnotations;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
public sealed class IsLessThanAttribute(string property) : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var currentValue = (DateTime)value!;

        var comparisonProperty = validationContext.ObjectType.GetProperty(property) ?? throw new ArgumentException("Comparison property not found.");
        var comparisonValue = (DateTime)comparisonProperty.GetValue(validationContext.ObjectInstance)!;
        if (currentValue >= comparisonValue)
        {
            return new ValidationResult($"{validationContext.DisplayName} must be less than {comparisonProperty.Name}.");
        }

        return ValidationResult.Success;
    }
}