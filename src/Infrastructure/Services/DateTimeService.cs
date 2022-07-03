using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}