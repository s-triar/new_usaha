using Microsoft.AspNetCore.Mvc;
using new_usaha.Application.WeatherForecasts.Queries.GetWeatherForecasts;

namespace new_usaha.WebUI.Controllers
{
    public class WeatherForecastController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            return await Mediator.Send(new GetWeatherForecastsQuery());
        }
    }
}