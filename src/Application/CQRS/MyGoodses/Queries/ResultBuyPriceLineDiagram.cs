using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public enum DiagramRangeBuyPriceType
{
    PRICE = 1,
    CHANGE = 2,
}
public class ResultBuyPriceLineDiagramItem
{
    public DateTime DateTime { get; set; }
    public decimal Price { get; set; }

}
 
public class ResultBuyPriceLineDiagram
{
    public DiagramRangeBuyPriceType Type { get; set; }
    public List<ResultBuyPriceLineDiagramItem> Items { get; set; } = new List<ResultBuyPriceLineDiagramItem>();
    public decimal Average { get; set; }
}
