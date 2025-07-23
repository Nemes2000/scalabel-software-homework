using food_service.Models;

namespace food_service.Exceptions;

public class EntityNotFoundException(string type) : Exception($"{type} entity not found");

public class UnexpectedException(string message) : Exception(message);

public class NameCollisionException(string type) : Exception($"A {type} already has the same name!");