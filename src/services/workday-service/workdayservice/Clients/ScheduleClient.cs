using AutoMapper;
using System.Text;
using System.Text.Json;
using workday_service.DTO;
using workday_service.Models;
using static System.Net.Mime.MediaTypeNames;

namespace workday_service.Clients
{
    public class ScheduleClient(HttpClient httpClient, IMapper mapper)
    {
        private readonly string SchedulesClientPrefixURI = "Schedules";

        public async Task SetSchedulesInterval(Workday workday)
        {
            var url = this.SchedulesClientPrefixURI + $"/set-intervals";
            var workdayDto = mapper.Map<WorkdayGetDto>(workday);

            var postItemJson = new StringContent(
                 JsonSerializer.Serialize(workdayDto),
                 Encoding.UTF8,
                 Application.Json);

            using var httpResponseMessage =
                await httpClient.PostAsync(url, postItemJson);

            httpResponseMessage.EnsureSuccessStatusCode();
        }

        public async Task<List<ScheduleGetDTO>> GetSchedulesByWorkdayId(int workdayId)
        {
            var url = this.SchedulesClientPrefixURI + $"/workday/{workdayId}";
            using var httpResponseMessage = await httpClient.GetAsync(url);

            httpResponseMessage.EnsureSuccessStatusCode();

            return await httpResponseMessage.Content.ReadFromJsonAsync<List<ScheduleGetDTO>>();
        }
    }
}
