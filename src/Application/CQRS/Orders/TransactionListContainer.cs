using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.Orders
{
    public class TransactionListContainer : SearchPageResponse<OrderDto>
    {
        public TransactionListContainer(List<OrderDto> items, int count, int pageNumber, int pageSize) : base(items, count, pageNumber, pageSize)
        {
        }
    }
}
