using UserService.Models;

namespace UserService.Exceptions;

public class EntityNotFoundException(string type) : Exception($"{type} entity not found");

public class UnexpectedException(string message) : Exception(message);

public class ManagerDeletionException() : Exception($"Cannot delete manager.");