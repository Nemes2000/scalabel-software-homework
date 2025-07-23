using static System.Net.Mime.MediaTypeNames;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Azure;
using schedule_service.DTO;

namespace schedule_service.Clients
{
    public class WorkdayClient(HttpClient httpClient)
    {
        private readonly string WorkdayClientPrefixURI = "Workday";

        public async Task<WorkdayIdDto> CopyWorkdayDataToNextDay(int fromId, int plusDays)
        {
            var copyDayDto = new CopyWorkdayDto() { WorkdayId = fromId, PlusDay = plusDays };
            var postItemJson = new StringContent(
                JsonSerializer.Serialize(copyDayDto),
                Encoding.UTF8,
                Application.Json);

            using var httpResponseMessage =
                await httpClient.PostAsync(this.WorkdayClientPrefixURI + "/copy-day", postItemJson);

            httpResponseMessage.EnsureSuccessStatusCode();

            return await httpResponseMessage.Content.ReadFromJsonAsync<WorkdayIdDto>();
        }

        public async Task<WorkdayIdsDto> GetWeekDaysIds(DateOnly from)
        {
            var url = this.WorkdayClientPrefixURI;
            var uriBuilder = new UriBuilder("http://workday-service:5004/Workday/next-seven-day")
            {
                Query = $"from={from.Year}-{from.Month}-{from.Day}"
            };

            using var httpResponseMessage = await httpClient.GetAsync(uriBuilder.ToString());

            httpResponseMessage.EnsureSuccessStatusCode();

            return await httpResponseMessage.Content.ReadFromJsonAsync<WorkdayIdsDto>();
        }

        public async Task<WorkdayGetDto> GetWorkdayById(int workdayId)
        {
            var url = this.WorkdayClientPrefixURI + $"/{workdayId}";
            using var httpResponseMessage = await httpClient.GetAsync(url);

            httpResponseMessage.EnsureSuccessStatusCode();

            return await httpResponseMessage.Content.ReadFromJsonAsync<WorkdayGetDto>();
        }

        public async Task DeleteWeekByFirstDay(DateOnly firstDayToDelete)
        {
            var url = this.WorkdayClientPrefixURI + $"/delete-week/{firstDayToDelete.Year}-{firstDayToDelete.Month}-{firstDayToDelete.Day}";
            using var httpResponseMessage = await httpClient.DeleteAsync(url);

            httpResponseMessage.EnsureSuccessStatusCode();
        }
    }
}
