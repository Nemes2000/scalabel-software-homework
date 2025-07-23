using schedule_service.DTO;
using schedule_service.Models;

namespace schedule_service.Exceptions;

public class EntityNotFoundException(string type) : Exception($"{type} entity not found");

public class UnexpectedException(string message) : Exception(message);

public class InvalidUserRoleException(UserRole role) : Exception($"Cannot make this change on user with role {role}");

public class InvalidDateRangeException() : Exception("Schedule duration is not in the duration of the given Workday");

public class DateCollisionException(Schedule collidesWith) : Exception($"Employee already has schedule during this period ({collidesWith.From} - {collidesWith.To})");