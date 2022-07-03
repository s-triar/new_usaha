using new_usaha.Domain.Common;

namespace new_usaha.Application.Common.Interfaces;

public interface IDomainEventService
{
    Task Publish(DomainEvent domainEvent);
}
