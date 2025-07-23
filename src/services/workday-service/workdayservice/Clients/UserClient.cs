using AutoMapper;
using System.Text.Json.Serialization;
using System;
using workday_service.DTO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace workday_service.Clients
{
    public class GetEmployeesApiResponse
    {
        [Required]
        public required string Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string UserName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public required string Email { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int HourlyWage { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required UserRole Role { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; } = null;
    }

    public class UserClient(HttpClient httpClient)
    {
        private readonly string UserClientPrefixURI = "Users";

        public async Task<ICollection<GetEmployeesApiResponse>> GetEmployeesAsync()
        {
            using var httpResponseMessage = await httpClient.GetAsync(this.UserClientPrefixURI + "/");

            httpResponseMessage.EnsureSuccessStatusCode();

            var jsonResponse = await httpResponseMessage.Content.ReadAsStringAsync();

            // Deserialize the JSON response into the UserResponse object
            var userResponse = JsonSerializer.Deserialize<ICollection<GetEmployeesApiResponse>>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                Converters = { new JsonStringEnumConverter() }
            });

            return userResponse;
        }
    }
}
