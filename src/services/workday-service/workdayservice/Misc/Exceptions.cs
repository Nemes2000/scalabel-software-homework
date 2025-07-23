namespace workday_service.Exceptions;

public class EntityNotFoundException(string type) : Exception($"{type} entity not found");

public class UnexpectedException(string message) : Exception(message);

public class WorkdayIsNotOpenException() : Exception("Cannot set opening or closing time if isOpen is false");

public class WorkdayIsOpenException() : Exception("Must set opening and closing time if isOpen is true");

public class WorkdayAlreadyExistsException() : Exception("Workday already exists for this date");
