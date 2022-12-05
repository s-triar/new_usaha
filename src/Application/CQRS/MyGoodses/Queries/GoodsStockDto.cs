using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public class GoodsStockDto
{
    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public int N { get; set; }
    public int Threshold { get; set; }
}
