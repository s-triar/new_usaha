using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;


public class ResultOmzetLineDiagramItem
{
    public DateTime DateTime { get; set; }
    public decimal Total { get; set; }
}

public class ResultOmzetLineDiagram
{
    public List<ResultOmzetLineDiagramItem> Items { get; set; } = new List<ResultOmzetLineDiagramItem>();
    public decimal Average { get; set; }
}
