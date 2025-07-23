using schedule_service.DTO;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Text.Json.Serialization;

namespace schedule_service.Clients
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

        public async Task<GetEmployeesApiResponse> GetEmployeeById(string employeeId)
        {
            
            var url = this.UserClientPrefixURI + $"/{employeeId}";
            using var response = await httpClient.GetAsync(url);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<GetEmployeesApiResponse>();
        }
    }
}
