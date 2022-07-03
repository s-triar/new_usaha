using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.Common.Models
{
    // Note: This is currently just used to demonstrate applying multiple IMapFrom attributes.
    //public class LookupDto : IMapFrom<TodoList>, IMapFrom<TodoItem>
    //{
    //    public int Id { get; set; }

    //    public string? Title { get; set; }
    //}
    public class LookupDto 
    {
        public int Id { get; set; }

        public string? Title { get; set; }
    }
}