using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;


public enum DiagramRangeSellPriceType
{
    PRICE = 1,
    CHANGE = 2,
}

public class ResultSellPriceLineDiagramItem
{
    public DateTime DateTime { get; set; }
    public decimal Price { get; set; }

}

public class ResultSellPriceLineDiagram
{
    public DiagramRangeSellPriceType Type { get; set; }
    public List<ResultSellPriceLineDiagramItem> Items { get; set; } = new List<ResultSellPriceLineDiagramItem>();
    public decimal Average { get; set; }
}
