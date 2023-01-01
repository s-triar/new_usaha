using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public enum DiagramRangeSoldType
{
    SUM = 1,
    AVERAGE = 2,
    MAX=3,
    MIN=4
}

public class ResultSoldLineDiagramItem
{
    public DateTime DateTime { get; set; }
    public decimal N { get; set; }
}

public class ResultSoldLineDiagram
{
    public DiagramRangeSoldType Type { get; set; }
    public List<ResultSoldLineDiagramItem> Items { get; set; } = new List<ResultSoldLineDiagramItem>();
    public decimal Average { get; set; }
}